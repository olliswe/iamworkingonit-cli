import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Updatetype = {
  __typename?: 'Updatetype';
  /** Id of Update Type */
  id: Scalars['String'];
  /** Content of Update Type */
  type: Scalars['String'];
  statusupdates: Array<Statusupdate>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type Statusupdate = {
  __typename?: 'Statusupdate';
  /** Id of Status Update */
  id: Scalars['String'];
  /** Content of Status Update */
  status: Scalars['String'];
  updatetype: Updatetype;
  user?: Maybe<User>;
  team?: Maybe<Team>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Team = {
  __typename?: 'Team';
  /** Id of team */
  id: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  /** Name of team */
  teamName: Scalars['String'];
  statusupdates?: Maybe<Array<Statusupdate>>;
  users: Array<User>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  /** id */
  id: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  /** First name of user */
  firstName: Scalars['String'];
  /** Last name of user */
  lastName: Scalars['String'];
  /** Email of user */
  email: Scalars['String'];
  /** Password of a user */
  password: Scalars['String'];
  team?: Maybe<Team>;
  statusupdates?: Maybe<Statusupdate>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  accessToken: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  user: User;
  teams: Array<Team>;
  team: Team;
  statusupdates: Array<Statusupdate>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryTeamArgs = {
  id: Scalars['String'];
};


export type QueryStatusupdatesArgs = {
  limit?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  signup: User;
  login: LoginOutput;
  createUser: User;
  updateUser: User;
  createTeam: Team;
  updateTeam: Team;
  removeTeam: Team;
  createStatusupdate: Statusupdate;
};


export type MutationSignupArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationCreateTeamArgs = {
  createTeamInput: CreateTeamInput;
};


export type MutationUpdateTeamArgs = {
  updateTeamInput: UpdateTeamInput;
};


export type MutationRemoveTeamArgs = {
  id: Scalars['String'];
};


export type MutationCreateStatusupdateArgs = {
  createStatusupdateInput: CreateStatusupdateInput;
};

export type CreateUserInput = {
  /** User First Name */
  firstName: Scalars['String'];
  /** User Last Name */
  lastName: Scalars['String'];
  /** User Email */
  email: Scalars['String'];
  /** User Password */
  password: Scalars['String'];
};

export type LoginInput = {
  /** User Email */
  email: Scalars['String'];
  /** User Password */
  password: Scalars['String'];
};

export type UpdateUserInput = {
  /** User First Name */
  firstName?: Maybe<Scalars['String']>;
  /** User Last Name */
  lastName?: Maybe<Scalars['String']>;
  /** User Email */
  email?: Maybe<Scalars['String']>;
  /** User Password */
  password?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
  teamId?: Maybe<Scalars['String']>;
};

export type CreateTeamInput = {
  /** Team Name */
  teamName: Scalars['String'];
};

export type UpdateTeamInput = {
  teamName: Scalars['String'];
  id: Scalars['String'];
};

export type CreateStatusupdateInput = {
  /** Content of Status Update */
  status: Scalars['String'];
};

export type CreateStatusupdateMutationVariables = Exact<{
  status: Scalars['String'];
}>;


export type CreateStatusupdateMutation = (
  { __typename?: 'Mutation' }
  & { createStatusupdate: (
    { __typename?: 'Statusupdate' }
    & Pick<Statusupdate, 'id' | 'status' | 'createdAt' | 'updatedAt'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName'>
    )>, team?: Maybe<(
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'teamName'>
    )> }
  ) }
);

export type CreateTeamMutationVariables = Exact<{
  teamName: Scalars['String'];
}>;


export type CreateTeamMutation = (
  { __typename?: 'Mutation' }
  & { createTeam: (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'teamName'>
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginOutput' }
    & Pick<LoginOutput, 'accessToken'>
  ) }
);

export type SignupMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = (
  { __typename?: 'Mutation' }
  & { signup: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  ) }
);

export type StatusupdatesQueryVariables = Exact<{
  userId?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type StatusupdatesQuery = (
  { __typename?: 'Query' }
  & { statusupdates: Array<(
    { __typename?: 'Statusupdate' }
    & Pick<Statusupdate, 'createdAt' | 'status'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName'>
    )>, team?: Maybe<(
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'teamName'>
    )> }
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  userId: Scalars['String'];
  teamId?: Maybe<Scalars['String']>;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName'>
    & { team?: Maybe<(
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'teamName'>
    )> }
  ) }
);

export type UserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'avatar' | 'createdAt' | 'updatedAt'>
  ) }
);


export const CreateStatusupdateDocument = gql`
    mutation CreateStatusupdate($status: String!) {
  createStatusupdate(createStatusupdateInput: {status: $status}) {
    id
    status
    createdAt
    updatedAt
    user {
      id
      firstName
      lastName
    }
    team {
      id
      teamName
    }
  }
}
    `;
export const CreateTeamDocument = gql`
    mutation createTeam($teamName: String!) {
  createTeam(createTeamInput: {teamName: $teamName}) {
    id
    teamName
  }
}
    `;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(loginInput: {email: $email, password: $password}) {
    accessToken
  }
}
    `;
export const SignupDocument = gql`
    mutation Signup($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  signup(
    createUserInput: {firstName: $firstName, lastName: $lastName, email: $email, password: $password}
  ) {
    id
    email
  }
}
    `;
export const StatusupdatesDocument = gql`
    query Statusupdates($userId: String, $limit: Int) {
  statusupdates(userId: $userId, limit: $limit) {
    createdAt
    status
    user {
      id
      firstName
      lastName
    }
    team {
      id
      teamName
    }
  }
}
    `;
export const UpdateUserDocument = gql`
    mutation updateUser($userId: String!, $teamId: String) {
  updateUser(updateUserInput: {userId: $userId, teamId: $teamId}) {
    id
    firstName
    lastName
    team {
      id
      teamName
    }
  }
}
    `;
export const UserDocument = gql`
    query User($userId: String!) {
  user(id: $userId) {
    id
    firstName
    lastName
    avatar
    createdAt
    updatedAt
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateStatusupdate(variables: CreateStatusupdateMutationVariables, requestHeaders?: Headers): Promise<CreateStatusupdateMutation> {
      return withWrapper(() => client.request<CreateStatusupdateMutation>(print(CreateStatusupdateDocument), variables, requestHeaders));
    },
    createTeam(variables: CreateTeamMutationVariables, requestHeaders?: Headers): Promise<CreateTeamMutation> {
      return withWrapper(() => client.request<CreateTeamMutation>(print(CreateTeamDocument), variables, requestHeaders));
    },
    Login(variables: LoginMutationVariables, requestHeaders?: Headers): Promise<LoginMutation> {
      return withWrapper(() => client.request<LoginMutation>(print(LoginDocument), variables, requestHeaders));
    },
    Signup(variables: SignupMutationVariables, requestHeaders?: Headers): Promise<SignupMutation> {
      return withWrapper(() => client.request<SignupMutation>(print(SignupDocument), variables, requestHeaders));
    },
    Statusupdates(variables?: StatusupdatesQueryVariables, requestHeaders?: Headers): Promise<StatusupdatesQuery> {
      return withWrapper(() => client.request<StatusupdatesQuery>(print(StatusupdatesDocument), variables, requestHeaders));
    },
    updateUser(variables: UpdateUserMutationVariables, requestHeaders?: Headers): Promise<UpdateUserMutation> {
      return withWrapper(() => client.request<UpdateUserMutation>(print(UpdateUserDocument), variables, requestHeaders));
    },
    User(variables: UserQueryVariables, requestHeaders?: Headers): Promise<UserQuery> {
      return withWrapper(() => client.request<UserQuery>(print(UserDocument), variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;