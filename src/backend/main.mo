import Array "mo:core/Array";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Int "mo:core/Int";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type PlanType = {
    #free;
    #pro;
    #premium;
  };

  public type UserProfile = {
    username : Text;
    email : Text;
    plan : PlanType;
    createdAt : Time.Time;
    bio : Text;
    avatarUrl : Text;
  };

  public type SavedContent = {
    id : Text;
    toolName : Text;
    content : Text;
    createdAt : Time.Time;
    tags : [Text];
    owner : Principal;
  };

  public type ToolUsage = {
    toolName : Text;
    timestamp : Time.Time;
  };

  public type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  public type UserStats = {
    profile : UserProfile;
    totalUsage : Nat;
    savedContentCount : Nat;
  };

  public type ToolUsageStats = {
    toolName : Text;
    count : Nat;
  };

  module SavedContent {
    public func compare(content1 : SavedContent, content2 : SavedContent) : Order.Order {
      Int.compare(content2.createdAt, content1.createdAt);
    };
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let savedContent = Map.empty<Text, SavedContent>();
  let favoriteTools = Map.empty<Principal, Set.Set<Text>>();
  let toolUsage = Map.empty<Principal, [ToolUsage]>();
  let contactSubmissions = Map.empty<Text, ContactSubmission>();
  var contactSubmissionCounter : Nat = 0;

  // REQUIRED PROFILE FUNCTIONS (per instructions)

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  // USER PROFILE FUNCTIONS

  public shared ({ caller }) func updateProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getPlan() : async ?PlanType {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view plan");
    };
    switch (userProfiles.get(caller)) {
      case (null) { null };
      case (?profile) { ?profile.plan };
    };
  };

  public shared ({ caller }) func updatePlan(plan : PlanType) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update plan");
    };
    switch (userProfiles.get(caller)) {
      case (null) { Runtime.trap("User profile not found") };
      case (?profile) {
        userProfiles.add(
          caller,
          {
            username = profile.username;
            email = profile.email;
            plan;
            createdAt = profile.createdAt;
            bio = profile.bio;
            avatarUrl = profile.avatarUrl;
          },
        );
      };
    };
  };

  // SAVED CONTENT FUNCTIONS

  public shared ({ caller }) func saveContent(content : SavedContent) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save content");
    };
    // Ensure the owner is set to the caller
    let ownedContent = {
      id = content.id;
      toolName = content.toolName;
      content = content.content;
      createdAt = content.createdAt;
      tags = content.tags;
      owner = caller;
    };
    savedContent.add(content.id, ownedContent);
  };

  public query ({ caller }) func getSavedContent() : async [SavedContent] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view saved content");
    };
    let userContent = savedContent.values().toArray().filter(
      func(content) { content.owner == caller }
    );
    userContent.sort();
  };

  public shared ({ caller }) func deleteContent(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete content");
    };
    switch (savedContent.get(id)) {
      case (null) { Runtime.trap("Content not found") };
      case (?content) {
        if (content.owner != caller) {
          Runtime.trap("Unauthorized: Only owner can delete content");
        };
        savedContent.remove(id);
      };
    };
  };

  public query ({ caller }) func getSavedContentCount() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view content count");
    };
    let userContent = savedContent.values().toArray().filter(
      func(content) { content.owner == caller }
    );
    userContent.size();
  };

  // FAVORITE TOOLS FUNCTIONS

  public shared ({ caller }) func favoriteTool(toolId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can favorite tools");
    };
    let userFavorites = switch (favoriteTools.get(caller)) {
      case (null) { Set.empty<Text>() };
      case (?favorites) { favorites };
    };
    userFavorites.add(toolId);
    favoriteTools.add(caller, userFavorites);
  };

  public shared ({ caller }) func unfavoriteTool(toolId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can unfavorite tools");
    };
    switch (favoriteTools.get(caller)) {
      case (null) { Runtime.trap("No favorites found") };
      case (?favorites) {
        favorites.remove(toolId);
        favoriteTools.add(caller, favorites);
      };
    };
  };

  public query ({ caller }) func getFavoriteTools() : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view favorite tools");
    };
    switch (favoriteTools.get(caller)) {
      case (null) { [] };
      case (?favorites) {
        favorites.values().toArray();
      };
    };
  };

  // TOOL USAGE TRACKING FUNCTIONS

  public shared ({ caller }) func recordToolUsage(toolName : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can record tool usage");
    };
    let usage : ToolUsage = {
      toolName;
      timestamp = Time.now();
    };
    let currentUsage = switch (toolUsage.get(caller)) {
      case (null) { [] };
      case (?usages) { usages };
    };
    toolUsage.add(caller, (currentUsage.concat([usage])));
  };

  public query ({ caller }) func getToolUsageCount(toolName : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view tool usage");
    };
    switch (toolUsage.get(caller)) {
      case (null) { 0 };
      case (?usages) {
        usages.filter(func(u) { u.toolName == toolName }).size();
      };
    };
  };

  public query ({ caller }) func getTotalUsageStats() : async {
    totalUses : Nat;
    breakdown : [ToolUsageStats];
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view usage stats");
    };
    switch (toolUsage.get(caller)) {
      case (null) {
        { totalUses = 0; breakdown = [] };
      };
      case (?usages) {
        let toolCounts = Map.empty<Text, Nat>();
        for (usage in usages.vals()) {
          let count = switch (toolCounts.get(usage.toolName)) {
            case (null) { 1 };
            case (?c) { c + 1 };
          };
          toolCounts.add(usage.toolName, count);
        };
        let breakdown = toolCounts.entries().toArray().map(
          func((toolName, count)) : ToolUsageStats {
            { toolName; count };
          }
        );
        { totalUses = usages.size(); breakdown };
      };
    };
  };

  // ADMIN FUNCTIONS

  public query ({ caller }) func listAllUsers() : async [UserStats] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can list all users");
    };
    userProfiles.entries().toArray().map(
      func((principal, profile)) : UserStats {
        let totalUsage = switch (toolUsage.get(principal)) {
          case (null) { 0 };
          case (?usages) { usages.size() };
        };
        let savedContentCount = savedContent.values().toArray().filter(
          func(content) { content.owner == principal }
        ).size();
        {
          profile;
          totalUsage;
          savedContentCount;
        };
      }
    );
  };

  public query ({ caller }) func getPlatformToolUsageStats() : async [ToolUsageStats] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view platform stats");
    };
    let toolCounts = Map.empty<Text, Nat>();
    for ((_, usages) in toolUsage.entries()) {
      for (usage in usages.vals()) {
        let count = switch (toolCounts.get(usage.toolName)) {
          case (null) { 1 };
          case (?c) { c + 1 };
        };
        toolCounts.add(usage.toolName, count);
      };
    };
    toolCounts.entries().toArray().map(
      func((toolName, count)) : ToolUsageStats {
        { toolName; count };
      }
    );
  };

  public query ({ caller }) func getTotalUserCount() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view user count");
    };
    userProfiles.size();
  };

  // CONTACT FORM FUNCTIONS

  public shared ({ caller }) func submitContactForm(
    name : Text,
    email : Text,
    message : Text,
  ) : async () {
    // Anyone can submit contact form (including guests)
    let id = contactSubmissionCounter.toText();
    contactSubmissionCounter += 1;
    let submission : ContactSubmission = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contactSubmissions.add(id, submission);
  };

  public query ({ caller }) func listContactSubmissions() : async [ContactSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contact submissions");
    };
    contactSubmissions.values().toArray();
  };
};
