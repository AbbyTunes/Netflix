import gql from "graphql-tag";

export default {
  REGISTER_USER: gql`
    mutation RegisterUser($name: String!, $email: String!, $password: String!) {
      register(name: $name, email: $email, password: $password) {
        name
        email
        loggedIn
      }
    }
  `,
  LOGIN_USER: gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
			  id
        token
        loggedIn
        name
      }
    }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
				loggedIn
      }
    }
  `,
  ADD_COMMENT: gql`
    mutation NewComment($body: String!, $author: ID!, $art: ID, $article: ID) {
      newComment(body: $body, author: $author, art: $art, article: $article){
        id
        body
        art {
          title
        }
        author {
          name
          id
        }
      }
    }
  `,
  DELETE_COMMENT: gql`
    mutation DeleteComment($id: ID!) {
      deleteComment(_id: $id) {
        id
        body
        
      }
    }
  `,
  CREATE_ART: gql`
    mutation CreateArt($category: ID!, $author: ID!, $title: String!, $description: String!, $photoLink: String!) {
      newArt(category: $category, author: $author, title: $title, description: $description, photoLink: $photoLink) {
          category {
            id
            name
          }
          author {
            id
            name
          }
          title
          description
          photoLink
      } 
    }
  `,
  CREATE_ARTICLE: gql`
    mutation CreateArticle($author: ID!, $title: String!, $body: String!, $photoLink: String, $header: String!) {
      newArticle(author: $author, title: $title, body: $body, photoLink: $photoLink, header: $header) {
          author {
            id
            name
          }
          header
          title
          body
          photoLink
      } 
    }
  `,
  ADD_ARTICLE_LIKE: gql`
    mutation AddArticleLike($userId: ID!, $articleId: ID!){
      addUserLikedArticle(userId: $userId, articleId: $articleId) {
        id
        name
        likedArticles {
          id 
          title
          likers {
            id
          }
        }
      }
    }
  `,
  ADD_ARTICLE_UNLIKE: gql`
    mutation AddArticleLike($userId: ID!, $articleId: ID!){
      addUserLikedArticle(userId: $userId, articleId: $articleId) {
        id
        name
        likedArticles {
          id 
          title
          likers {
            id
          }
        }
      }
    }
	`,
	USER_LIKE_ART: gql`
    mutation addUserLikedArt($userId: ID!, $artId: ID!){
      addUserLikedArt(userId: $userId, artId: $artId) {
        id
        name
        likedArts {
          id 
          title
          likers {
						id
						name
          }
        }
      }
    }
	`,
	USER_UNLIKE_ART: gql`
    mutation userUnlikeArt($userId: ID!, $artId: ID!){
      userUnlikeArt(userId: $userId, artId: $artId) {
        id
        name
        likedArts {
          id
          title
          likers {
						id
						name
          }
        }
      }
    }
	`
};
