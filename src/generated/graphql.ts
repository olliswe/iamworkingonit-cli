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

export type Teamsecret = {
  __typename?: 'Teamsecret';
  /** id */
  id: Scalars['String'];
  secret: Scalars['String'];
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
  secret: Teamsecret;
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
  statusupdates?: Maybe<Array<Statusupdate>>;
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
  team: Team;
  statusupdates: Array<Statusupdate>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryTeamArgs = {
  queryTeamInput?: Maybe<QueryTeamInput>;
};


export type QueryStatusupdatesArgs = {
  teamId?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['String']>;
};

export type QueryTeamInput = {
  limit: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signup: User;
  login: LoginOutput;
  createUser: User;
  joinTeam: User;
  createTeam: Team;
  generateSecret: Teamsecret;
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


export type MutationJoinTeamArgs = {
  joinTeamInput: JoinTeamInput;
};


export type MutationCreateTeamArgs = {
  createTeamInput: CreateTeamInput;
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

export type JoinTeamInput = {
  /** Current Secret of Team */
  secret: Scalars['String'];
};

export type CreateTeamInput = {
  /** Team Name */
  teamName: Scalars['String'];
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

export type GenerateSecretMutationVariables = Exact<{ [key: string]: never; }>;


export type GenerateSecretMutation = (
  { __typename?: 'Mutation' }
  & { generateSecret: (
    { __typename?: 'Teamsecret' }
    & Pick<Teamsecret, 'secret'>
  ) }
);

export type JoinTeamMutationVariables = Exact<{
  secret: Scalars['String'];
}>;


export type JoinTeamMutation = (
  { __typename?: 'Mutation' }
  & { joinTeam: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
    & { team?: Maybe<(
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'teamName'>
    )> }
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
  userId: Scalars['String'];
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

export type TeamQueryVariables = Exact<{
  limit?: Scalars['Int'];
}>;


export type TeamQuery = (
  { __typename?: 'Query' }
  & { team: (
    { __typename?: 'Team' }
    & Pick<Team, 'teamName'>
    & { users: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>
      & { statusupdates?: Maybe<Array<(
        { __typename?: 'Statusupdate' }
        & Pick<Statusupdate, 'id' | 'createdAt' | 'status'>
      )>> }
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
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'avatar' | 'createdAt' | 'updatedAt'>
    & { team?: Maybe<(
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'teamName'>
    )> }
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
export const GenerateSecretDocument = gql`
    mutation GenerateSecret {
  generateSecret {
    secret
  }
}
    `;
export const JoinTeamDocument = gql`
    mutation JoinTeam($secret: String!) {
  joinTeam(joinTeamInput: {secret: $secret}) {
    id
    firstName
    lastName
    email
    team {
      id
      teamName
    }
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
    query Statusupdates($userId: String!, $limit: Int = 1) {
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
export const TeamDocument = gql`
    query Team($limit: Int! = 2) {
  team(queryTeamInput: {limit: $limit}) {
    teamName
    users {
      id
      firstName
      lastName
      email
      statusupdates {
        id
        createdAt
        status
      }
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
    email
    avatar
    createdAt
    updatedAt
    team {
      id
      teamName
    }
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
    GenerateSecret(variables?: GenerateSecretMutationVariables, requestHeaders?: Headers): Promise<GenerateSecretMutation> {
      return withWrapper(() => client.request<GenerateSecretMutation>(print(GenerateSecretDocument), variables, requestHeaders));
    },
    JoinTeam(variables: JoinTeamMutationVariables, requestHeaders?: Headers): Promise<JoinTeamMutation> {
      return withWrapper(() => client.request<JoinTeamMutation>(print(JoinTeamDocument), variables, requestHeaders));
    },
    Login(variables: LoginMutationVariables, requestHeaders?: Headers): Promise<LoginMutation> {
      return withWrapper(() => client.request<LoginMutation>(print(LoginDocument), variables, requestHeaders));
    },
    Signup(variables: SignupMutationVariables, requestHeaders?: Headers): Promise<SignupMutation> {
      return withWrapper(() => client.request<SignupMutation>(print(SignupDocument), variables, requestHeaders));
    },
    Statusupdates(variables: StatusupdatesQueryVariables, requestHeaders?: Headers): Promise<StatusupdatesQuery> {
      return withWrapper(() => client.request<StatusupdatesQuery>(print(StatusupdatesDocument), variables, requestHeaders));
    },
    Team(variables?: TeamQueryVariables, requestHeaders?: Headers): Promise<TeamQuery> {
      return withWrapper(() => client.request<TeamQuery>(print(TeamDocument), variables, requestHeaders));
    },
    User(variables: UserQueryVariables, requestHeaders?: Headers): Promise<UserQuery> {
      return withWrapper(() => client.request<UserQuery>(print(UserDocument), variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;