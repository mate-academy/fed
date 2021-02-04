import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import { GraphQLError } from 'graphql-request/dist/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  GraphQLDateTime: string;
  Upload: any;
};

export type Subscription = {
  __typename?: 'Subscription';
  candidateProfileStatusUpdated: CandidateProfile;
  newMessage?: Maybe<ChatMessage>;
  profileConnectionUpdated: ProfileConnection;
  recruiterProfileStatusUpdated: RecruiterProfile;
  userUnreadMessagesCountUpdated?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  adminUser?: Maybe<User>;
  authUser?: Maybe<User>;
  candidateProfileBySlug?: Maybe<CandidateProfile>;
  candidateProfilesBySubscription: Array<CandidateProfile>;
  employmentLocations?: Maybe<Array<EmploymentLocation>>;
  employmentTypes?: Maybe<Array<EmploymentType>>;
  englishLevels?: Maybe<Array<EnglishLevel>>;
  jobExperiences?: Maybe<Array<JobExperience>>;
  latestCandidateProfile?: Maybe<CandidateProfile>;
  latestRecruiterProfile?: Maybe<RecruiterProfile>;
  profileConnection?: Maybe<ProfileConnection>;
  publicCandidateProfiles: Array<CandidateProfile>;
  publicRecruiterProfiles: Array<RecruiterProfile>;
  recruiterProfileBySlug?: Maybe<RecruiterProfile>;
  serviceUser?: Maybe<User>;
  specializations?: Maybe<Array<Specialization>>;
  technologies?: Maybe<Array<Technology>>;
  usersOAuthProviders?: Maybe<Array<OAuthToken>>;
  usersSearchSubscriptions?: Maybe<Array<UsersSearchSubscription>>;
};


export type QueryCandidateProfileBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryCandidateProfilesBySubscriptionArgs = {
  subscriptionLastInteract: Scalars['GraphQLDateTime'];
  where: PublicProfilesParameters;
};


export type QueryProfileConnectionArgs = {
  id: Scalars['Int'];
};


export type QueryPublicCandidateProfilesArgs = {
  where?: Maybe<PublicProfilesParameters>;
};


export type QueryRecruiterProfileBySlugArgs = {
  slug: Scalars['String'];
};


export type QuerySpecializationsArgs = {
  query?: Maybe<Scalars['String']>;
};


export type QueryTechnologiesArgs = {
  query?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  archiveProfileConnectionForUser?: Maybe<Scalars['Boolean']>;
  confirmEmail: Scalars['Boolean'];
  connectOAuthProvider: Scalars['Boolean'];
  createMessageTemplate: UserTemplateMessage;
  createTechnology: Technology;
  deactivateCandidateProfiles: Scalars['Boolean'];
  deactivateRecruiterProfiles: Scalars['Boolean'];
  deleteProfileConnectionForUser?: Maybe<Scalars['Boolean']>;
  disconnectOAuthProvider: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  logOut: Scalars['Boolean'];
  logOutFromUser: User;
  removeCvFile: User;
  reportOfferStatus: ProfileConnection;
  resetPassword: Scalars['Boolean'];
  reviewCandidateProfile: CandidateProfile;
  reviewProfileConnectionRequest: ProfileConnection;
  reviewRecruiterProfile: RecruiterProfile;
  sendCandidateProfileToReview: CandidateProfile;
  sendConfirmEmailLink: Scalars['Boolean'];
  sendMessage: ChatMessage;
  sendProfileConnectionRequest: ProfileConnection;
  sendRecruiterProfileToReview: RecruiterProfile;
  signIn: User;
  signInAsUser: User;
  signUp: User;
  socialSignUp: User;
  subscribeToCandidatesSearch: UsersSearchSubscription;
  unsubscribeFromCandidatesSearch: Scalars['Boolean'];
  updateCandidateProfile: CandidateProfile;
  updateConnectionLastActionTime?: Maybe<ProfileConnection>;
  updateProfileContacts: User;
  updateRecruiterProfile: RecruiterProfile;
  updateSubscriptionLastNotified: Scalars['Boolean'];
  updateSubscriptionLastUsed: Scalars['Boolean'];
  uploadCvFile: User;
};


export type MutationArchiveProfileConnectionForUserArgs = {
  id: Scalars['Int'];
};


export type MutationConfirmEmailArgs = {
  token: Scalars['String'];
};


export type MutationConnectOAuthProviderArgs = {
  provider: OAuthProviders;
  token: Scalars['String'];
  id: Scalars['String'];
};


export type MutationCreateMessageTemplateArgs = {
  userId: Scalars['Int'];
  messageType: PrimaryProfile;
  messageTitle: Scalars['String'];
  messageBody: Scalars['String'];
};


export type MutationCreateTechnologyArgs = {
  name: Scalars['String'];
};


export type MutationDeleteProfileConnectionForUserArgs = {
  id: Scalars['Int'];
};


export type MutationDisconnectOAuthProviderArgs = {
  provider: OAuthProviders;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationReportOfferStatusArgs = {
  profileConnectionId: Scalars['Int'];
  status: OfferStatus;
};


export type MutationResetPasswordArgs = {
  token: Scalars['String'];
  password: Scalars['String'];
  repeatPassword: Scalars['String'];
};


export type MutationReviewCandidateProfileArgs = {
  id: Scalars['Int'];
  status: CandidateProfileStatus;
  rejectReason?: Maybe<Scalars['String']>;
};


export type MutationReviewProfileConnectionRequestArgs = {
  id: Scalars['Int'];
  status: ProfileConnectionStatus;
};


export type MutationReviewRecruiterProfileArgs = {
  id: Scalars['Int'];
  status: RecruiterProfileStatus;
  rejectReason?: Maybe<Scalars['String']>;
};


export type MutationSendMessageArgs = {
  profileConnectionId: Scalars['Int'];
  message: Scalars['String'];
};


export type MutationSendProfileConnectionRequestArgs = {
  candidateProfileId: Scalars['Int'];
  recruiterProfileId: Scalars['Int'];
};


export type MutationSignInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignInAsUserArgs = {
  email: Scalars['String'];
};


export type MutationSignUpArgs = {
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  repeatPassword: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  fvType?: Maybe<Scalars['String']>;
  fvSource?: Maybe<Scalars['String']>;
  fvMedium?: Maybe<Scalars['String']>;
  fvCampaign?: Maybe<Scalars['String']>;
  fvContent?: Maybe<Scalars['String']>;
  fvTerm?: Maybe<Scalars['String']>;
  lvType?: Maybe<Scalars['String']>;
  lvSource?: Maybe<Scalars['String']>;
  lvMedium?: Maybe<Scalars['String']>;
  lvCampaign?: Maybe<Scalars['String']>;
  lvContent?: Maybe<Scalars['String']>;
  lvTerm?: Maybe<Scalars['String']>;
  gClientid?: Maybe<Scalars['String']>;
  gIp?: Maybe<Scalars['String']>;
  gAgent?: Maybe<Scalars['String']>;
  gclid?: Maybe<Scalars['String']>;
};


export type MutationSocialSignUpArgs = {
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  fvType?: Maybe<Scalars['String']>;
  fvSource?: Maybe<Scalars['String']>;
  fvMedium?: Maybe<Scalars['String']>;
  fvCampaign?: Maybe<Scalars['String']>;
  fvContent?: Maybe<Scalars['String']>;
  fvTerm?: Maybe<Scalars['String']>;
  lvType?: Maybe<Scalars['String']>;
  lvSource?: Maybe<Scalars['String']>;
  lvMedium?: Maybe<Scalars['String']>;
  lvCampaign?: Maybe<Scalars['String']>;
  lvContent?: Maybe<Scalars['String']>;
  lvTerm?: Maybe<Scalars['String']>;
  gClientid?: Maybe<Scalars['String']>;
  gIp?: Maybe<Scalars['String']>;
  gAgent?: Maybe<Scalars['String']>;
  gclid?: Maybe<Scalars['String']>;
  providerId: Scalars['String'];
  providerName: Scalars['String'];
  token?: Maybe<Scalars['String']>;
};


export type MutationSubscribeToCandidatesSearchArgs = {
  title: Scalars['String'];
  searchParams: PublicProfilesParameters;
};


export type MutationUnsubscribeFromCandidatesSearchArgs = {
  id: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationUpdateCandidateProfileArgs = {
  position?: Maybe<Scalars['String']>;
  salary?: Maybe<Scalars['Float']>;
  candidateDescription?: Maybe<Scalars['String']>;
  experienceDescription?: Maybe<Scalars['String']>;
  workExpectations?: Maybe<Scalars['String']>;
  technologiesIds?: Maybe<Array<Scalars['Int']>>;
  jobExperienceId?: Maybe<Scalars['Int']>;
  employmentTypesIds?: Maybe<Array<Scalars['Int']>>;
  employmentLocationsIds?: Maybe<Array<Scalars['Int']>>;
  englishLevelId?: Maybe<Scalars['Int']>;
  specializationId?: Maybe<Scalars['Int']>;
  cities?: Maybe<Array<CandidateProfileCityInput>>;
};


export type MutationUpdateConnectionLastActionTimeArgs = {
  id: Scalars['Int'];
  time?: Maybe<Scalars['GraphQLDateTime']>;
};


export type MutationUpdateProfileContactsArgs = {
  phone: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};


export type MutationUpdateRecruiterProfileArgs = {
  position?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
};


export type MutationUpdateSubscriptionLastNotifiedArgs = {
  subscriptionsIds?: Maybe<Array<Scalars['Int']>>;
};


export type MutationUpdateSubscriptionLastUsedArgs = {
  id: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationUploadCvFileArgs = {
  file: Scalars['Upload'];
  size?: Maybe<Scalars['Int']>;
};

export enum CandidateProfileStatus {
  Draft = 'DRAFT',
  OnReview = 'ON_REVIEW',
  Rejected = 'REJECTED',
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type CandidateProfile = {
  __typename?: 'CandidateProfile';
  id: Scalars['Int'];
  slug?: Maybe<Scalars['String']>;
  status: CandidateProfileStatus;
  rejectReason?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  salary?: Maybe<Scalars['Float']>;
  candidateDescription?: Maybe<Scalars['String']>;
  experienceDescription?: Maybe<Scalars['String']>;
  workExpectations?: Maybe<Scalars['String']>;
  technologies?: Maybe<Array<Technology>>;
  employmentTypes?: Maybe<Array<EmploymentType>>;
  employmentLocations?: Maybe<Array<EmploymentLocation>>;
  englishLevel?: Maybe<EnglishLevel>;
  jobExperience?: Maybe<JobExperience>;
  specialization?: Maybe<Specialization>;
  user?: Maybe<User>;
  cities?: Maybe<Array<CandidateProfileCity>>;
  lastActionTime?: Maybe<Scalars['GraphQLDateTime']>;
};

export type PublicProfilesParameters = {
  cities?: Maybe<Array<Scalars['String']>>;
  specializations?: Maybe<Array<Scalars['String']>>;
  salaryFrom?: Maybe<Scalars['Int']>;
  salaryTo?: Maybe<Scalars['Int']>;
  searchQuery?: Maybe<Scalars['String']>;
  experienceIds?: Maybe<Array<Scalars['Int']>>;
  englishLevelIds?: Maybe<Array<Scalars['Int']>>;
  employmentTypesIds?: Maybe<Array<Scalars['Int']>>;
  technologiesIds?: Maybe<Array<Scalars['Int']>>;
  employmentLocationsIds?: Maybe<Array<Scalars['Int']>>;
};

export type CandidateProfileCityInput = {
  cityId: Scalars['String'];
  cityName: Scalars['String'];
};

export type CandidateProfileCity = {
  __typename?: 'CandidateProfileCity';
  id: Scalars['Int'];
  cityId: Scalars['String'];
  cityName: Scalars['String'];
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  id: Scalars['Int'];
  message?: Maybe<Scalars['String']>;
  senderUser?: Maybe<User>;
  recipientUser?: Maybe<User>;
  profileConnectionId: Scalars['Int'];
  isSystemMessage?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['GraphQLDateTime'];
};

export enum MessageUserRole {
  Sender = 'SENDER',
  Recipient = 'RECIPIENT',
  NotDefined = 'NOT_DEFINED'
}


export type EmploymentLocation = {
  __typename?: 'EmploymentLocation';
  id: Scalars['Int'];
  slug: Scalars['String'];
};

export type EmploymentType = {
  __typename?: 'EmploymentType';
  id: Scalars['Int'];
  slug: Scalars['String'];
};

export type EnglishLevel = {
  __typename?: 'EnglishLevel';
  id: Scalars['Int'];
  slug: Scalars['String'];
};

export type JobExperience = {
  __typename?: 'JobExperience';
  id: Scalars['Int'];
  slug: Scalars['String'];
};

export enum OAuthProviders {
  Github = 'GITHUB',
  Google = 'GOOGLE',
  Linkedin = 'LINKEDIN'
}

export type OAuthToken = {
  __typename?: 'OAuthToken';
  id: Scalars['Int'];
  providerName: Scalars['String'];
  providerId: Scalars['String'];
  token: Scalars['String'];
};

export type ProfileConnection = {
  __typename?: 'ProfileConnection';
  id: Scalars['Int'];
  candidateUser?: Maybe<User>;
  recruiterUser: User;
  candidateProfile: CandidateProfile;
  recruiterProfile: RecruiterProfile;
  initiator: ProfileConnectionInitiator;
  status: ProfileConnectionStatus;
  chatMessages?: Maybe<Array<ChatMessage>>;
  candidateReportedStatus?: Maybe<OfferStatus>;
  recruiterReportedStatus?: Maybe<OfferStatus>;
  userMeta?: Maybe<ProfileConnectionUserMeta>;
  buddyMeta?: Maybe<ProfileConnectionUserMeta>;
  unreadMessagesCount?: Maybe<Scalars['Int']>;
};

export enum ProfileConnectionInitiator {
  Candidate = 'CANDIDATE',
  Recruiter = 'RECRUITER'
}

export enum ProfileConnectionStatus {
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Rejected = 'REJECTED'
}

export enum OfferStatus {
  Offer = 'OFFER',
  NoOffer = 'NO_OFFER'
}

export type ProfileConnectionUserMeta = {
  __typename?: 'ProfileConnectionUserMeta';
  id: Scalars['Int'];
  lastActionTime?: Maybe<Scalars['GraphQLDateTime']>;
};

export enum RecruiterProfileStatus {
  Draft = 'DRAFT',
  OnReview = 'ON_REVIEW',
  Rejected = 'REJECTED',
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type RecruiterProfile = {
  __typename?: 'RecruiterProfile';
  id: Scalars['Int'];
  slug?: Maybe<Scalars['String']>;
  status: RecruiterProfileStatus;
  rejectReason?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  lastActionTime?: Maybe<Scalars['GraphQLDateTime']>;
};

export type Specialization = {
  __typename?: 'Specialization';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Technology = {
  __typename?: 'Technology';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type UploadedFile = {
  __typename?: 'UploadedFile';
  id: Scalars['Int'];
  name: Scalars['String'];
  mime: Scalars['String'];
  url: Scalars['String'];
};

export enum PrimaryProfile {
  Recruiter = 'RECRUITER',
  Candidate = 'CANDIDATE',
  NotDefined = 'NOT_DEFINED'
}

export enum UserRole {
  User = 'USER',
  Admin = 'ADMIN'
}

export type User = {
  __typename?: 'User';
  computedName?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  created?: Maybe<Scalars['Boolean']>;
  cv?: Maybe<UploadedFile>;
  email: Scalars['String'];
  facebookId?: Maybe<Scalars['String']>;
  facebookToken?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  fvCampaign?: Maybe<Scalars['String']>;
  fvContent?: Maybe<Scalars['String']>;
  fvMedium?: Maybe<Scalars['String']>;
  fvSource?: Maybe<Scalars['String']>;
  fvTerm?: Maybe<Scalars['String']>;
  fvType?: Maybe<Scalars['String']>;
  gAgent?: Maybe<Scalars['String']>;
  gClientid?: Maybe<Scalars['String']>;
  gIp?: Maybe<Scalars['String']>;
  gclid?: Maybe<Scalars['String']>;
  githubId?: Maybe<Scalars['String']>;
  githubToken?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  googleToken?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  inactive?: Maybe<Scalars['Boolean']>;
  isAdminUser?: Maybe<Scalars['Boolean']>;
  isAuthUser?: Maybe<Scalars['Boolean']>;
  lastActionTime?: Maybe<Scalars['GraphQLDateTime']>;
  lastName?: Maybe<Scalars['String']>;
  linkedinId?: Maybe<Scalars['String']>;
  linkedinToken?: Maybe<Scalars['String']>;
  lvCampaign?: Maybe<Scalars['String']>;
  lvContent?: Maybe<Scalars['String']>;
  lvMedium?: Maybe<Scalars['String']>;
  lvSource?: Maybe<Scalars['String']>;
  lvTerm?: Maybe<Scalars['String']>;
  lvType?: Maybe<Scalars['String']>;
  messageTemplates?: Maybe<Array<UserTemplateMessage>>;
  phone?: Maybe<Scalars['String']>;
  primaryProfile?: Maybe<PrimaryProfile>;
  profileConnections?: Maybe<Array<ProfileConnection>>;
  searchSubscriptions?: Maybe<Array<UsersSearchSubscription>>;
  unreadMessagesCount?: Maybe<Scalars['Int']>;
  userRole?: Maybe<UserRole>;
  username?: Maybe<Scalars['String']>;
};


export type UserMessageTemplatesArgs = {
  messageType: PrimaryProfile;
};


export type UserProfileConnectionsArgs = {
  archived?: Maybe<Scalars['Boolean']>;
};

export type UserTemplateMessage = {
  __typename?: 'UserTemplateMessage';
  id: Scalars['Int'];
  messageType?: Maybe<PrimaryProfile>;
  messageTitle: Scalars['String'];
  messageBody: Scalars['String'];
  createdAt?: Maybe<Scalars['GraphQLDateTime']>;
};

export type UsersSearchSubscription = {
  __typename?: 'UsersSearchSubscription';
  id: Scalars['Int'];
  userId: Scalars['Int'];
  title: Scalars['String'];
  lastUsed: Scalars['GraphQLDateTime'];
  lastNotified?: Maybe<Scalars['GraphQLDateTime']>;
  searchParams: CandidatesSearchParams;
  stringifiedSearchParams: SubscriptionStringifiedParams;
  user?: Maybe<User>;
};

export type SubscriptionStringifiedParams = {
  __typename?: 'SubscriptionStringifiedParams';
  id: Scalars['Int'];
  employmentLocations?: Maybe<Array<EmploymentLocation>>;
  employmentTypes?: Maybe<Array<EmploymentType>>;
  technologies?: Maybe<Array<Technology>>;
  jobExperiences?: Maybe<Array<JobExperience>>;
  englishLevels?: Maybe<Array<EnglishLevel>>;
};

export type CandidatesSearchParams = {
  __typename?: 'CandidatesSearchParams';
  cities?: Maybe<Array<Scalars['String']>>;
  specializations?: Maybe<Array<Scalars['String']>>;
  salaryFrom?: Maybe<Scalars['Int']>;
  salaryTo?: Maybe<Scalars['Int']>;
  searchQuery?: Maybe<Scalars['String']>;
  experienceIds?: Maybe<Array<Scalars['Int']>>;
  englishLevelIds?: Maybe<Array<Scalars['Int']>>;
  employmentTypesIds?: Maybe<Array<Scalars['Int']>>;
  technologiesIds?: Maybe<Array<Scalars['Int']>>;
  employmentLocationsIds?: Maybe<Array<Scalars['Int']>>;
};


export type CandidateProfileFullFragment = (
  { __typename?: 'CandidateProfile' }
  & CandidateProfileBaseFragment
  & CandidateProfileTechnologiesFragment
  & CandidateProfileEnglishLevelFragment
  & CandidateProfileJobExperienceFragment
  & CandidateProfileEmploymentTypesFragment
  & CandidateProfileSpecializationFragment
  & CandidateProfileCitiesFragment
  & CandidateProfileEmploymentLocationsFragment
);

export type CandidateProfileBaseFragment = (
  { __typename?: 'CandidateProfile' }
  & Pick<CandidateProfile, 'id' | 'status' | 'rejectReason' | 'position' | 'salary' | 'candidateDescription' | 'experienceDescription' | 'workExpectations' | 'slug' | 'lastActionTime'>
);

export type CandidateProfileCitiesFragment = (
  { __typename?: 'CandidateProfile' }
  & { cities?: Maybe<Array<(
    { __typename?: 'CandidateProfileCity' }
    & CandidateProfileCityBaseFragment
  )>> }
);

export type CandidateProfileEmploymentLocationsFragment = (
  { __typename?: 'CandidateProfile' }
  & { employmentLocations?: Maybe<Array<(
    { __typename?: 'EmploymentLocation' }
    & EmploymentLocationBaseFragment
  )>> }
);

export type CandidateProfileEmploymentTypesFragment = (
  { __typename?: 'CandidateProfile' }
  & { employmentTypes?: Maybe<Array<(
    { __typename?: 'EmploymentType' }
    & EmploymentTypeBaseFragment
  )>> }
);

export type CandidateProfileEnglishLevelFragment = (
  { __typename?: 'CandidateProfile' }
  & { englishLevel?: Maybe<(
    { __typename?: 'EnglishLevel' }
    & EnglishLevelBaseFragment
  )> }
);

export type CandidateProfileJobExperienceFragment = (
  { __typename?: 'CandidateProfile' }
  & { jobExperience?: Maybe<(
    { __typename?: 'JobExperience' }
    & JobExperienceBaseFragment
  )> }
);

export type CandidateProfileSpecializationFragment = (
  { __typename?: 'CandidateProfile' }
  & { specialization?: Maybe<(
    { __typename?: 'Specialization' }
    & SpecializationBaseFragment
  )> }
);

export type CandidateProfileTechnologiesFragment = (
  { __typename?: 'CandidateProfile' }
  & { technologies?: Maybe<Array<(
    { __typename?: 'Technology' }
    & TechnologyBaseFragment
  )>> }
);

export type CandidateProfilesBySubscriptionQueryVariables = Exact<{
  subscriptionLastInteract: Scalars['GraphQLDateTime'];
  where: PublicProfilesParameters;
}>;


export type CandidateProfilesBySubscriptionQuery = (
  { __typename?: 'Query' }
  & { candidateProfilesBySubscription: Array<(
    { __typename?: 'CandidateProfile' }
    & CandidateProfileFullFragment
  )> }
);

export type CandidateProfileCityBaseFragment = (
  { __typename?: 'CandidateProfileCity' }
  & Pick<CandidateProfileCity, 'id' | 'cityId' | 'cityName'>
);

export type EmploymentLocationBaseFragment = (
  { __typename?: 'EmploymentLocation' }
  & Pick<EmploymentLocation, 'id' | 'slug'>
);

export type EmploymentTypeBaseFragment = (
  { __typename?: 'EmploymentType' }
  & Pick<EmploymentType, 'id' | 'slug'>
);

export type EnglishLevelBaseFragment = (
  { __typename?: 'EnglishLevel' }
  & Pick<EnglishLevel, 'id' | 'slug'>
);

export type JobExperienceBaseFragment = (
  { __typename?: 'JobExperience' }
  & Pick<JobExperience, 'id' | 'slug'>
);

export type SpecializationBaseFragment = (
  { __typename?: 'Specialization' }
  & Pick<Specialization, 'id' | 'name'>
);

export type TechnologyBaseFragment = (
  { __typename?: 'Technology' }
  & Pick<Technology, 'id' | 'name'>
);

export type UsersSearchSubscriptionFullFragment = (
  { __typename?: 'UsersSearchSubscription' }
  & UsersSearchSubscriptionBaseFragment
  & UsersSearchSubscriptionParamsFragment
  & UsersSearchSubscriptionUserFragment
);

export type UsersSearchSubscriptionBaseFragment = (
  { __typename?: 'UsersSearchSubscription' }
  & Pick<UsersSearchSubscription, 'id' | 'title' | 'userId' | 'lastUsed' | 'lastNotified'>
);

export type UsersSearchSubscriptionParamsFragment = (
  { __typename?: 'UsersSearchSubscription' }
  & { searchParams: (
    { __typename?: 'CandidatesSearchParams' }
    & Pick<CandidatesSearchParams, 'cities' | 'specializations' | 'salaryFrom' | 'salaryTo' | 'searchQuery' | 'experienceIds' | 'englishLevelIds' | 'employmentTypesIds' | 'technologiesIds' | 'employmentLocationsIds'>
  ) }
);

export type UsersSearchSubscriptionUserFragment = (
  { __typename?: 'UsersSearchSubscription' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email'>
  )> }
);

export type UpdateSubscriptionLastNotifiedMutationVariables = Exact<{
  subscriptionsIds?: Maybe<Array<Scalars['Int']>>;
}>;


export type UpdateSubscriptionLastNotifiedMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateSubscriptionLastNotified'>
);

export type UsersSearchSubscriptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersSearchSubscriptionsQuery = (
  { __typename?: 'Query' }
  & { usersSearchSubscriptions?: Maybe<Array<(
    { __typename?: 'UsersSearchSubscription' }
    & UsersSearchSubscriptionFullFragment
  )>> }
);

export const CandidateProfileBaseFragmentDoc = gql`
    fragment CandidateProfileBase on CandidateProfile {
  id
  status
  rejectReason
  position
  salary
  candidateDescription
  experienceDescription
  workExpectations
  slug
  lastActionTime
}
    `;
export const TechnologyBaseFragmentDoc = gql`
    fragment TechnologyBase on Technology {
  id
  name
}
    `;
export const CandidateProfileTechnologiesFragmentDoc = gql`
    fragment CandidateProfileTechnologies on CandidateProfile {
  technologies {
    ...TechnologyBase
  }
}
    ${TechnologyBaseFragmentDoc}`;
export const EnglishLevelBaseFragmentDoc = gql`
    fragment EnglishLevelBase on EnglishLevel {
  id
  slug
}
    `;
export const CandidateProfileEnglishLevelFragmentDoc = gql`
    fragment CandidateProfileEnglishLevel on CandidateProfile {
  englishLevel {
    ...EnglishLevelBase
  }
}
    ${EnglishLevelBaseFragmentDoc}`;
export const JobExperienceBaseFragmentDoc = gql`
    fragment JobExperienceBase on JobExperience {
  id
  slug
}
    `;
export const CandidateProfileJobExperienceFragmentDoc = gql`
    fragment CandidateProfileJobExperience on CandidateProfile {
  jobExperience {
    ...JobExperienceBase
  }
}
    ${JobExperienceBaseFragmentDoc}`;
export const EmploymentTypeBaseFragmentDoc = gql`
    fragment EmploymentTypeBase on EmploymentType {
  id
  slug
}
    `;
export const CandidateProfileEmploymentTypesFragmentDoc = gql`
    fragment CandidateProfileEmploymentTypes on CandidateProfile {
  employmentTypes {
    ...EmploymentTypeBase
  }
}
    ${EmploymentTypeBaseFragmentDoc}`;
export const SpecializationBaseFragmentDoc = gql`
    fragment SpecializationBase on Specialization {
  id
  name
}
    `;
export const CandidateProfileSpecializationFragmentDoc = gql`
    fragment CandidateProfileSpecialization on CandidateProfile {
  specialization {
    ...SpecializationBase
  }
}
    ${SpecializationBaseFragmentDoc}`;
export const CandidateProfileCityBaseFragmentDoc = gql`
    fragment CandidateProfileCityBase on CandidateProfileCity {
  id
  cityId
  cityName
}
    `;
export const CandidateProfileCitiesFragmentDoc = gql`
    fragment CandidateProfileCities on CandidateProfile {
  cities {
    ...CandidateProfileCityBase
  }
}
    ${CandidateProfileCityBaseFragmentDoc}`;
export const EmploymentLocationBaseFragmentDoc = gql`
    fragment EmploymentLocationBase on EmploymentLocation {
  id
  slug
}
    `;
export const CandidateProfileEmploymentLocationsFragmentDoc = gql`
    fragment CandidateProfileEmploymentLocations on CandidateProfile {
  employmentLocations {
    ...EmploymentLocationBase
  }
}
    ${EmploymentLocationBaseFragmentDoc}`;
export const CandidateProfileFullFragmentDoc = gql`
    fragment CandidateProfileFull on CandidateProfile {
  ...CandidateProfileBase
  ...CandidateProfileTechnologies
  ...CandidateProfileEnglishLevel
  ...CandidateProfileJobExperience
  ...CandidateProfileEmploymentTypes
  ...CandidateProfileSpecialization
  ...CandidateProfileCities
  ...CandidateProfileEmploymentLocations
}
    ${CandidateProfileBaseFragmentDoc}
${CandidateProfileTechnologiesFragmentDoc}
${CandidateProfileEnglishLevelFragmentDoc}
${CandidateProfileJobExperienceFragmentDoc}
${CandidateProfileEmploymentTypesFragmentDoc}
${CandidateProfileSpecializationFragmentDoc}
${CandidateProfileCitiesFragmentDoc}
${CandidateProfileEmploymentLocationsFragmentDoc}`;
export const UsersSearchSubscriptionBaseFragmentDoc = gql`
    fragment UsersSearchSubscriptionBase on UsersSearchSubscription {
  id
  title
  userId
  lastUsed
  lastNotified
}
    `;
export const UsersSearchSubscriptionParamsFragmentDoc = gql`
    fragment UsersSearchSubscriptionParams on UsersSearchSubscription {
  searchParams {
    cities
    specializations
    salaryFrom
    salaryTo
    searchQuery
    experienceIds
    englishLevelIds
    employmentTypesIds
    technologiesIds
    employmentLocationsIds
  }
}
    `;
export const UsersSearchSubscriptionUserFragmentDoc = gql`
    fragment UsersSearchSubscriptionUser on UsersSearchSubscription {
  user {
    email
  }
}
    `;
export const UsersSearchSubscriptionFullFragmentDoc = gql`
    fragment UsersSearchSubscriptionFull on UsersSearchSubscription {
  ...UsersSearchSubscriptionBase
  ...UsersSearchSubscriptionParams
  ...UsersSearchSubscriptionUser
}
    ${UsersSearchSubscriptionBaseFragmentDoc}
${UsersSearchSubscriptionParamsFragmentDoc}
${UsersSearchSubscriptionUserFragmentDoc}`;
export const CandidateProfilesBySubscriptionDocument = gql`
    query candidateProfilesBySubscription($subscriptionLastInteract: GraphQLDateTime!, $where: PublicProfilesParameters!) {
  candidateProfilesBySubscription(subscriptionLastInteract: $subscriptionLastInteract, where: $where) {
    ...CandidateProfileFull
  }
}
    ${CandidateProfileFullFragmentDoc}`;
export const UpdateSubscriptionLastNotifiedDocument = gql`
    mutation updateSubscriptionLastNotified($subscriptionsIds: [Int!]) {
  updateSubscriptionLastNotified(subscriptionsIds: $subscriptionsIds)
}
    `;
export const UsersSearchSubscriptionsDocument = gql`
    query usersSearchSubscriptions {
  usersSearchSubscriptions {
    ...UsersSearchSubscriptionFull
  }
}
    ${UsersSearchSubscriptionFullFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    candidateProfilesBySubscription(variables: CandidateProfilesBySubscriptionQueryVariables): Promise<{ data?: CandidateProfilesBySubscriptionQuery | undefined; extensions?: any; headers: Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper(() => client.rawRequest<CandidateProfilesBySubscriptionQuery>(print(CandidateProfilesBySubscriptionDocument), variables));
    },
    updateSubscriptionLastNotified(variables?: UpdateSubscriptionLastNotifiedMutationVariables): Promise<{ data?: UpdateSubscriptionLastNotifiedMutation | undefined; extensions?: any; headers: Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper(() => client.rawRequest<UpdateSubscriptionLastNotifiedMutation>(print(UpdateSubscriptionLastNotifiedDocument), variables));
    },
    usersSearchSubscriptions(variables?: UsersSearchSubscriptionsQueryVariables): Promise<{ data?: UsersSearchSubscriptionsQuery | undefined; extensions?: any; headers: Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper(() => client.rawRequest<UsersSearchSubscriptionsQuery>(print(UsersSearchSubscriptionsDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;