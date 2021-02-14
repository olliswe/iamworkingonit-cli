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
  /** Avatar of Team (URL) */
  avatar?: Maybe<Scalars['String']>;
  /** Name of team */
  teamName: Scalars['String'];
  /** Latest Statusupdates of a Team */
  statusupdates?: Maybe<Array<Statusupdate>>;
  /** Users of a Team */
  users?: Maybe<Array<User>>;
  /** Secrets of a Team */
  teamsecrets?: Maybe<Array<Teamsecret>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type TeamStatusupdatesArgs = {
  limit?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  /** id */
  id: Scalars['String'];
  /** Avatar of User (URL) */
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


export type UserStatusupdatesArgs = {
  limit?: Maybe<Scalars['Int']>;
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  accessToken: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  user: User;
  team: Team;
};


export type QueryTeamArgs = {
  queryTeamInput?: Maybe<QueryTeamInput>;
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
  createStatusupdate: Statusupdate;
  createTeam: Team;
  generateSecret: Teamsecret;
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


export type MutationCreateStatusupdateArgs = {
  createStatusupdateInput: CreateStatusupdateInput;
};


export type MutationCreateTeamArgs = {
  createTeamInput: CreateTeamInput;
};


export type MutationGenerateSecretArgs = {
  email: Scalars['String'];
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

export type CreateStatusupdateInput = {
  /** Content of Status Update */
  status: Scalars['String'];
};

export type CreateTeamInput = {
  /** Team Name */
  teamName: Scalars['String'];
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
      & Pick<User, 'id' | 'email' | 'firstName' | 'lastName'>
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

export type GenerateSecretMutationVariables = Exact<{
  email: Scalars['String'];
}>;


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

export type TeamQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamQuery = (
  { __typename?: 'Query' }
  & { team: (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'teamName'>
    & { statusupdates?: Maybe<Array<(
      { __typename?: 'Statusupdate' }
      & Pick<Statusupdate, 'status' | 'createdAt' | 'id'>
      & { user?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'email' | 'firstName' | 'lastName'>
      )> }
    )>>, users?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'firstName' | 'lastName'>
      & { statusupdates?: Maybe<Array<(
        { __typename?: 'Statusupdate' }
        & Pick<Statusupdate, 'id' | 'createdAt' | 'status'>
        & { team?: Maybe<(
          { __typename?: 'Team' }
          & Pick<Team, 'teamName'>
        )> }
      )>> }
    )>> }
  ) }
);

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'avatar' | 'createdAt' | 'updatedAt'>
    & { team?: Maybe<(
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'teamName'>
    )>, statusupdates?: Maybe<Array<(
      { __typename?: 'Statusupdate' }
      & Pick<Statusupdate, 'id' | 'createdAt' | 'status'>
    )>> }
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
      email
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
    mutation GenerateSecret($email: String!) {
  generateSecret(email: $email) {
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
export const TeamDocument = gql`
    query Team {
  team {
    id
    teamName
    statusupdates(limit: 50) {
      status
      createdAt
      id
      user {
        email
        firstName
        lastName
      }
    }
    users {
      id
      email
      firstName
      lastName
      statusupdates(limit: 1) {
        id
        createdAt
        status
        team {
          teamName
        }
      }
    }
  }
}
    `;
export const UserDocument = gql`
    query User {
  user {
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
    statusupdates {
      id
      createdAt
      status
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
    GenerateSecret(variables: GenerateSecretMutationVariables, requestHeaders?: Headers): Promise<GenerateSecretMutation> {
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
    Team(variables?: TeamQueryVariables, requestHeaders?: Headers): Promise<TeamQuery> {
      return withWrapper(() => client.request<TeamQuery>(print(TeamDocument), variables, requestHeaders));
    },
    User(variables?: UserQueryVariables, requestHeaders?: Headers): Promise<UserQuery> {
      return withWrapper(() => client.request<UserQuery>(print(UserDocument), variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;