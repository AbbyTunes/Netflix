const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
	GraphQLNonNull
} = graphql;
const mongoose = require("mongoose");
const AuthService = require("../services/auth");

const User = mongoose.model("users");
const UserType = require("./types/user_type");
const Art = mongoose.model("arts");
const ArtType = require("./types/art_type");
const Category = mongoose.model("categories");
const CategoryType = require("./types/category_type");
const Comment = mongoose.model("comments");
const CommentType = require("./types/comment_type");

const mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		newCategory: {
			type: CategoryType,
			args: {
				name: { type: GraphQLString }
			},
			resolve(_, args) {
				return new Category(args).save();
			}
		},
		// deleteCategory: {
		// 	type: CategoryType,
		// 	args: {
		// 		_id: { type: GraphQLID }
		// 	},
		// 	resolve(_, { _id }) {
		// 		return Category.findByIdAndRemove(_id);
		// 	}
		// },
		newArt: {
			type: ArtType,
			args: {
				category: { type: GraphQLID },
				authorId: { type: GraphQLID },
				title: { type: GraphQLString },
				description: { type: GraphQLString },
				videoLink: { type: GraphQLString },
				photoLink: { type: GraphQLString }
			},
			async resolve(_, args, context) {
				return new Art(args).save()
					.then(art => {
						if (art.category) {
							return Category.findById(args.category).then(category => {
								category.arts.push(art);
								return category.save()
									.then(category => art)
							})
						} else {
							return art
						}
				});
				// const validUser = await AuthService.verifyUser({ token: context.token });
				// if (validUser.loggedIn) { 

				// } else {
				// 	throw new Error("sorry, you need to log in first");
				// }
			}
		},
		deleteArt: {
			type: ArtType,
			args: {
				_id: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(_, { _id }) {
				return Art.findByIdAndDelete(_id)
					.then(art => art)
					.catch(err => null);
			}
		},
		// updateProductCategory: {
		// 	type: ProductType,
		// 	args: {
		// 		productId: { type: new GraphQLNonNull(GraphQLID) },
		// 		categoryId: { type: new GraphQLNonNull(GraphQLID) }
		// 	},
		// 	resolve(_, { productId, categoryId }) {
		// 		return Product.updateProductCategory(productId, categoryId)
		// 			.then(product => product)
		// 			.catch(err => err);
		// 	}
		// },
		register: {
			type: UserType,
			args: {
				name: { type: GraphQLString },
				email: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve(_, args) {
				return AuthService.register(args);
			}
		},
		logout: {
			type: UserType,
			args: {
				_id: { type: GraphQLID }
			},
			resolve(_, args) {
				return AuthService.logout(args);
			}
		},
		login: {
			type: UserType,
			args: {
				email: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve(_, args) {
				return AuthService.login(args);
			}
		},
		verifyUser: {
			type: UserType,
			args: {
				token: { type: GraphQLString }
			},
			resolve(_, args) {
				return AuthService.verifyUser(args);
			}
		},
		addUserLikedArt: {
			type: UserType,
			args: { 
				userId: { type: GraphQLID },
				artId: { type: GraphQLID }
			},
			resolve(_, { userId, artId }) {
				return User.addLikedArt(userId, artId);
			}
		},
		addUserPublishedArt: {
			type: UserType,
			args: {
				userId: { type: GraphQLID },
				artId: { type: GraphQLID }
			},
			resolve(_, { userId, artId }) {
				return User.addPublishedArt(userId, artId);
			}
		},
		newComment: { 
			type: CommentType,
			args: {
				body: { type: GraphQLString },
				author: { type: GraphQLID },
				art: { type: GraphQLID }
			},
			async resolve(_, args) {
				return new Comment(args).save()
					.then(comment => {
						return User.findById(comment.author).then(user => {
							user.publishedComments.push(comment);
							return user.save()
								.then(user => comment);
						})
					.then(comment => {
						return Art.findById(comment.art).then(art => {
							art.comments.push(comment);
							return art.save()
								.then(art => comment);
						})
					})
				})
			}
		},
		// addUserPublishedComment: {
		// 	type: UserType,
		// 	args: {
		// 		userId: { type: GraphQLID },
		// 		artId: { type: GraphQLID },
		// 		commentId: { type: GraphQLID }
		// 	},
		// 	resolve(_, { userId, artId, commentId }) {
		// 		return User.addPublishedComment(userId, artId, commentId);
		// 	}
		// }
	}
});

module.exports = mutation;
