import gql from "graphql-tag";
 
export default {
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
			isLoggedIn @client
    }
  `,
	FETCH_ART: gql`
		query art($_id: ID!) {
			art(id: $id) {
				id
				authorId
				videoLink
				photoLink
				title
				description
				likes
				likers
				category
			}
		}
	`,
	FETCH_USER: gql`
		query user($_id: ID!) {
			user(_id: $_id) {
				id
				name
				email
				likedArts {
					id
					title
					photoLink
				}
				publishedArts {
					id 
					title
					photoLink
				}
			}
		}
	`,
};
