# Web Development

## Overview
Build web applications and APIs using Servant, Scotty, or Yesod.

## Servant - Type-Safe APIs

```haskell
{-# LANGUAGE DataKinds, TypeOperators #-}
import Servant

-- Define API type
type UserAPI = "users" :> Get '[JSON] [User]
          :<|> "user" :> Capture "id" Int :> Get '[JSON] User
          :<|> "user" :> ReqBody '[JSON] User :> Post '[JSON] User

data User = User { userId :: Int, userName :: String }
    deriving (Generic)

instance ToJSON User
instance FromJSON User

-- Implement handlers
server :: Server UserAPI
server = getUsers :<|> getUser :<|> createUser
    where
        getUsers = return [User 1 "Alice", User 2 "Bob"]
        getUser uid = return (User uid "Test")
        createUser user = return user

-- Run server
app :: Application
app = serve (Proxy :: Proxy UserAPI) server

main :: IO ()
main = run 8080 app
```

## Scotty - Lightweight Web Framework

```haskell
import Web.Scotty

main = scotty 3000 $ do
    get "/" $ do
        html "<h1>Hello World!</h1>"

    get "/users/:name" $ do
        name <- param "name"
        text $ "Hello " <> name

    post "/users" $ do
        user <- jsonData :: ActionM User
        json user
```

## Database with Persistent

```haskell
{-# LANGUAGE TemplateHaskell, QuasiQuotes #-}
import Database.Persist
import Database.Persist.TH

share [mkPersist sqlSettings] [persistLowerCase|
User
    name String
    email String
    deriving Show
|]

-- CRUD operations
createUser :: MonadIO m => String -> String -> ReaderT SqlBackend m (Key User)
createUser name email = insert $ User name email

getUser :: MonadIO m => Key User -> ReaderT SqlBackend m (Maybe User)
getUser = get

updateUser :: MonadIO m => Key User -> User -> ReaderT SqlBackend m ()
updateUser key user = replace key user

deleteUser :: MonadIO m => Key User -> ReaderT SqlBackend m ()
deleteUser = delete
```

## Tasks
1. Build REST API with Servant
2. Create web app with Scotty
3. Implement authentication
4. Add database with Persistent
5. Build complete blog application
6. Create WebSocket server
7. Implement file upload

## Congratulations!
You've completed the entire Haskell curriculum! You now have the knowledge to build production Haskell applications. Continue practicing and contributing to open-source Haskell projects!
