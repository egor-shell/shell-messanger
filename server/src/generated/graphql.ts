import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Chat = {
  __typename?: 'Chat';
  chatId?: Maybe<Scalars['String']>;
  messages?: Maybe<Array<Maybe<Message>>>;
  usersId?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type ChatInput = {
  chatId: Scalars['String'];
  usersId: Array<Scalars['Int']>;
};

export type Message = {
  __typename?: 'Message';
  messageId?: Maybe<Scalars['String']>;
  messageText?: Maybe<Scalars['String']>;
  senderName?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
};

export type MessageInput = {
  chatId: Scalars['String'];
  messageId: Scalars['String'];
  messageText: Scalars['String'];
  senderName: Scalars['String'];
  userId: Scalars['Int'];
  usersId: Array<Maybe<Scalars['Int']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMessage?: Maybe<Message>;
  checkAuth?: Maybe<User>;
  login?: Maybe<User>;
  registration?: Maybe<User>;
};


export type MutationAddMessageArgs = {
  input?: Maybe<MessageInput>;
};


export type MutationCheckAuthArgs = {
  input?: Maybe<CheckUserInput>;
};


export type MutationLoginArgs = {
  input?: Maybe<LoginUserInput>;
};


export type MutationRegistrationArgs = {
  input?: Maybe<RegisterUserInput>;
};

export type Query = {
  __typename?: 'Query';
  getAllChat?: Maybe<Array<Maybe<Chat>>>;
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  getChat?: Maybe<Chat>;
  getUser?: Maybe<User>;
  getUserForChat?: Maybe<Array<Maybe<User>>>;
};


export type QueryGetChatArgs = {
  input: Maybe<ChatInput>;
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};


export type QueryGetUserForChatArgs = {
  usersId: Array<Maybe<Array<Maybe<Scalars['Int']>>>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newChat?: Maybe<User>;
  newMessage?: Maybe<Chat>;
};


export type SubscriptionNewChatArgs = {
  input?: Maybe<UserInput>;
};


export type SubscriptionNewMessageArgs = {
  input?: Maybe<ChatInput>;
};

export type User = {
  __typename?: 'User';
  chats?: Maybe<Array<Maybe<UserChat>>>;
  id?: Maybe<Scalars['ID']>;
  password?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UserChat = {
  __typename?: 'UserChat';
  chatId?: Maybe<Scalars['String']>;
  usersId?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type UserInput = {
  usersId: Array<Maybe<Scalars['Int']>>;
};

export type CheckUserInput = {
  username: Scalars['String'];
};

export type LoginUserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterUserInput = {
  id?: Maybe<Scalars['ID']>;
  password: Scalars['String'];
  token?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Chat: ResolverTypeWrapper<Chat>;
  ChatInput: ChatInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Message: ResolverTypeWrapper<Message>;
  MessageInput: MessageInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  UserChat: ResolverTypeWrapper<UserChat>;
  UserInput: UserInput;
  checkUserInput: CheckUserInput;
  loginUserInput: LoginUserInput;
  registerUserInput: RegisterUserInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Chat: Chat;
  ChatInput: ChatInput;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Message: Message;
  MessageInput: MessageInput;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  User: User;
  UserChat: UserChat;
  UserInput: UserInput;
  checkUserInput: CheckUserInput;
  loginUserInput: LoginUserInput;
  registerUserInput: RegisterUserInput;
};

export type ChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']> = {
  chatId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  messages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType>;
  usersId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  messageId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  messageText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  senderName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<MutationAddMessageArgs, never>>;
  checkAuth?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCheckAuthArgs, never>>;
  login?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationLoginArgs, never>>;
  registration?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationRegistrationArgs, never>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllChat?: Resolver<Maybe<Array<Maybe<ResolversTypes['Chat']>>>, ParentType, ContextType>;
  getAllUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  getChat?: Resolver<Maybe<ResolversTypes['Chat']>, ParentType, ContextType, RequireFields<QueryGetChatArgs, never>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  getUserForChat?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<QueryGetUserForChatArgs, 'usersId'>>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  newChat?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "newChat", ParentType, ContextType, RequireFields<SubscriptionNewChatArgs, never>>;
  newMessage?: SubscriptionResolver<Maybe<ResolversTypes['Chat']>, "newMessage", ParentType, ContextType, RequireFields<SubscriptionNewMessageArgs, never>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  chats?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserChat']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserChat'] = ResolversParentTypes['UserChat']> = {
  chatId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  usersId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Chat?: ChatResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserChat?: UserChatResolvers<ContextType>;
};

