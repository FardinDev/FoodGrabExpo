import { icons, images } from "./";

const myProfile = {
    name: "Fardin Rahman",
    profile_image: images.fardin,
    address: "Stadium Road, Sirajganj"
}

const categoryData = [
    {
        id: 1,
        name: "Fast Food",
        icon: icons.burger
    },
    {
        id: 2,
        name: "Fruit Item",
        icon: icons.cherry
    },
    {
        id: 3,
        name: "Rice Item",
        icon: icons.rice
    }
]

const affordable = 1
const fairPrice = 2
const expensive = 3
const restaurantData = [
    {
        id: 1,
        name: "Downtown Sirajganj",
        rating: 4.8,
        restaurant_categories: [1,2,3],
        priceRating: affordable,
        photo: images.burger_restaurant_1,
        duration: "30 - 45 min",
        location: {
            latitude: 1.5347282806345879,
            longitude: 110.35632207358996,
        },
        courier: {
            avatar: images.profile,
            name: "Amy"
        },
        categories: [
            {
                id: 1,
                name: "Chicken Burger",
                icon: "",
                items: [
                    {
                        id: 231,
                        name: "Crispy Chicken Burger",
                        photo: images.crispy_chicken_burger,
                        description: "Burger with crispy chicken, cheese and lettuce",
                        calories: 200,
                        price: 10
                    },
                    {
                        id: 245,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 8753,
                        name: "French Fries",
                        photo: images.baked_fries,
                        description: "Crispy Baked French Fries",
                        calories: 194,
                        price: 8
                    }
                ]
            },
            {
                id: 2,
                name: "Beef Burger",
                icon: "",
                items: [
                    {
                        id: 1754,
                        name: "Crispy Chicken Burger",
                        photo: images.crispy_chicken_burger,
                        description: "Burger with crispy chicken, cheese and lettuce",
                        calories: 200,
                        price: 10
                    },
                    {
                        id: 968756,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 23456,
                        name: "Tomato Pasta",
                        photo: images.tomato_pasta,
                        description: "Pasta with fresh tomatoes",
                        calories: 100,
                        price: 10
                    },
                    {
                        id: 34560,
                        name: "Mediterranean Chopped Salad ",
                        photo: images.salad,
                        description: "Finely chopped lettuce, tomatoes, cucumbers",
                        calories: 100,
                        price: 10
                    }
                ]
            },
            {
                id: 3,
                name: "Sandwich",
                icon: "",
                items: [
                    {
                        id: 2498765,
                        name: "Crispy Chicken Burger",
                        photo: images.crispy_chicken_burger,
                        description: "Burger with crispy chicken, cheese and lettuce",
                        calories: 200,
                        price: 10
                    },
                    {
                        id: 12,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 569,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 4567890,
                        name: "French Fries",
                        photo: images.baked_fries,
                        description: "Crispy Baked French Fries",
                        calories: 194,
                        price: 8
                    },
                    {
                        id: 234567897654,
                        name: "Hawaiian Pizza",
                        photo: images.hawaiian_pizza,
                        description: "Canadian bacon, homemade pizza crust, pizza sauce",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 34525362,
                        name: "Tomato & Basil Pizza",
                        photo: images.pizza,
                        description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                        calories: 250,
                        price: 20
                    },
                    {
                        id: 9098765,
                        name: "Tomato Pasta",
                        photo: images.tomato_pasta,
                        description: "Pasta with fresh tomatoes",
                        calories: 100,
                        price: 10
                    },
                    {
                        id: 234567,
                        name: "Mediterranean Chopped Salad ",
                        photo: images.salad,
                        description: "Finely chopped lettuce, tomatoes, cucumbers",
                        calories: 100,
                        price: 10
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "Downtown Pizza",
        rating: 4.8,
        restaurant_categories: [2, 4, 6],
        priceRating: expensive,
        photo: images.pizza_restaurant,
        duration: "15 - 20 min",
        location: {
            latitude: 1.556306570595712,
            longitude: 110.35504616746915,
        },
        courier: {
            avatar: images.avatar_2,
            name: "Jackson"
        },
        categories: [
            {
                id: 1,
                name: "Chicken Burger",
                icon: "",
                items: [
                    {
                        id: 231,
                        name: "Crispy Chicken Burger",
                        photo: images.crispy_chicken_burger,
                        description: "Burger with crispy chicken, cheese and lettuce",
                        calories: 200,
                        price: 10
                    },
                    {
                        id: 245,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 8753,
                        name: "French Fries",
                        photo: images.baked_fries,
                        description: "Crispy Baked French Fries",
                        calories: 194,
                        price: 8
                    }
                ]
            },
            {
                id: 2,
                name: "Beef Burger",
                icon: "",
                items: [
                    {
                        id: 1754,
                        name: "Crispy Chicken Burger",
                        photo: images.crispy_chicken_burger,
                        description: "Burger with crispy chicken, cheese and lettuce",
                        calories: 200,
                        price: 10
                    },
                    {
                        id: 968756,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 23456,
                        name: "Tomato Pasta",
                        photo: images.tomato_pasta,
                        description: "Pasta with fresh tomatoes",
                        calories: 100,
                        price: 10
                    },
                    {
                        id: 34560,
                        name: "Mediterranean Chopped Salad ",
                        photo: images.salad,
                        description: "Finely chopped lettuce, tomatoes, cucumbers",
                        calories: 100,
                        price: 10
                    }
                ]
            },
            {
                id: 3,
                name: "Sandwich",
                icon: "",
                items: [
                    {
                        id: 2498765,
                        name: "Crispy Chicken Burger",
                        photo: images.crispy_chicken_burger,
                        description: "Burger with crispy chicken, cheese and lettuce",
                        calories: 200,
                        price: 10
                    },
                    {
                        id: 12,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 569,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 4567890,
                        name: "French Fries",
                        photo: images.baked_fries,
                        description: "Crispy Baked French Fries",
                        calories: 194,
                        price: 8
                    },
                    {
                        id: 234567897654,
                        name: "Hawaiian Pizza",
                        photo: images.hawaiian_pizza,
                        description: "Canadian bacon, homemade pizza crust, pizza sauce",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 34525362,
                        name: "Tomato & Basil Pizza",
                        photo: images.pizza,
                        description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                        calories: 250,
                        price: 20
                    },
                    {
                        id: 23098765,
                        name: "Tomato Pasta",
                        photo: images.tomato_pasta,
                        description: "Pasta with fresh tomatoes",
                        calories: 100,
                        price: 10
                    },
                    {
                        id: 234567,
                        name: "Mediterranean Chopped Salad ",
                        photo: images.salad,
                        description: "Finely chopped lettuce, tomatoes, cucumbers",
                        calories: 100,
                        price: 10
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        name: "Downtown Hotdogs",
        rating: 4.8,
        restaurant_categories: [3],
        priceRating: expensive,
        photo: images.hot_dog_restaurant,
        duration: "20 - 25 min",
        location: {
            latitude: 1.5238753474714375,
            longitude: 110.34261833833622,
        },
        courier: {
            avatar: images.avatar_3,
            name: "James"
        },
        categories: [
            {
                id: 1,
                name: "Chicken Burger",
                icon: "",
                items: [
                    {
                        id: 231,
                        name: "Crispy Chicken Burger",
                        photo: images.crispy_chicken_burger,
                        description: "Burger with crispy chicken, cheese and lettuce",
                        calories: 200,
                        price: 10
                    },
                    {
                        id: 245,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 8753,
                        name: "French Fries",
                        photo: images.baked_fries,
                        description: "Crispy Baked French Fries",
                        calories: 194,
                        price: 8
                    }
                ]
            },
            {
                id: 2,
                name: "Beef Burger",
                icon: "",
                items: [
                    {
                        id: 1754,
                        name: "Crispy Chicken Burger",
                        photo: images.crispy_chicken_burger,
                        description: "Burger with crispy chicken, cheese and lettuce",
                        calories: 200,
                        price: 10
                    },
                    {
                        id: 968756,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 23456,
                        name: "Tomato Pasta",
                        photo: images.tomato_pasta,
                        description: "Pasta with fresh tomatoes",
                        calories: 100,
                        price: 10
                    },
                    {
                        id: 34560,
                        name: "Mediterranean Chopped Salad ",
                        photo: images.salad,
                        description: "Finely chopped lettuce, tomatoes, cucumbers",
                        calories: 100,
                        price: 10
                    }
                ]
            },
            {
                id: 3,
                name: "Sandwich",
                icon: "",
                items: [
                    {
                        id: 2498765,
                        name: "Crispy Chicken Burger",
                        photo: images.crispy_chicken_burger,
                        description: "Burger with crispy chicken, cheese and lettuce",
                        calories: 200,
                        price: 10
                    },
                    {
                        id: 12,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 569,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 4567890,
                        name: "French Fries",
                        photo: images.baked_fries,
                        description: "Crispy Baked French Fries",
                        calories: 194,
                        price: 8
                    },
                    {
                        id: 234567897654,
                        name: "Hawaiian Pizza",
                        photo: images.hawaiian_pizza,
                        description: "Canadian bacon, homemade pizza crust, pizza sauce",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 34525362,
                        name: "Tomato & Basil Pizza",
                        photo: images.pizza,
                        description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                        calories: 250,
                        price: 20
                    },
                    {
                        id: 9998765,
                        name: "Tomato Pasta",
                        photo: images.tomato_pasta,
                        description: "Pasta with fresh tomatoes",
                        calories: 100,
                        price: 10
                    },
                    {
                        id: 234567,
                        name: "Mediterranean Chopped Salad ",
                        photo: images.salad,
                        description: "Finely chopped lettuce, tomatoes, cucumbers",
                        calories: 100,
                        price: 10
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        name: "Downtown Sushi",
        rating: 4.8,
        restaurant_categories: [8],
        priceRating: expensive,
        photo: images.japanese_restaurant,
        duration: "10 - 15 min",
        location: {
            latitude: 1.5578068150528928,
            longitude: 110.35482523764315,
        },
        courier: {
            avatar: images.avatar_4,
            name: "Ahmad"
        },
        categories: [
            {
                id: 1,
                name: "Chicken Burger",
                icon: "",
                items: [
                    {
                        id: 231,
                        name: "Crispy Chicken Burger",
                        photo: images.crispy_chicken_burger,
                        description: "Burger with crispy chicken, cheese and lettuce",
                        calories: 200,
                        price: 10
                    },
                    {
                        id: 245,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 8753,
                        name: "French Fries",
                        photo: images.baked_fries,
                        description: "Crispy Baked French Fries",
                        calories: 194,
                        price: 8
                    }
                ]
            },
            {
                id: 2,
                name: "Beef Burger",
                icon: "",
                items: [
                    {
                        id: 1754,
                        name: "Crispy Chicken Burger",
                        photo: images.crispy_chicken_burger,
                        description: "Burger with crispy chicken, cheese and lettuce",
                        calories: 200,
                        price: 10
                    },
                    {
                        id: 968756,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 23456,
                        name: "Tomato Pasta",
                        photo: images.tomato_pasta,
                        description: "Pasta with fresh tomatoes",
                        calories: 100,
                        price: 10
                    },
                    {
                        id: 34560,
                        name: "Mediterranean Chopped Salad ",
                        photo: images.salad,
                        description: "Finely chopped lettuce, tomatoes, cucumbers",
                        calories: 100,
                        price: 10
                    }
                ]
            },
            {
                id: 3,
                name: "Sandwich",
                icon: "",
                items: [
                    {
                        id: 2498765,
                        name: "Crispy Chicken Burger",
                        photo: images.crispy_chicken_burger,
                        description: "Burger with crispy chicken, cheese and lettuce",
                        calories: 200,
                        price: 10
                    },
                    {
                        id: 12,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 569,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 4567890,
                        name: "French Fries",
                        photo: images.baked_fries,
                        description: "Crispy Baked French Fries",
                        calories: 194,
                        price: 8
                    },
                    {
                        id: 234567897654,
                        name: "Hawaiian Pizza",
                        photo: images.hawaiian_pizza,
                        description: "Canadian bacon, homemade pizza crust, pizza sauce",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 34525362,
                        name: "Tomato & Basil Pizza",
                        photo: images.pizza,
                        description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                        calories: 250,
                        price: 20
                    },
                    {
                        id: 18765,
                        name: "Tomato Pasta",
                        photo: images.tomato_pasta,
                        description: "Pasta with fresh tomatoes",
                        calories: 100,
                        price: 10
                    },
                    {
                        id: 234567,
                        name: "Mediterranean Chopped Salad ",
                        photo: images.salad,
                        description: "Finely chopped lettuce, tomatoes, cucumbers",
                        calories: 100,
                        price: 10
                    }
                ]
            }
        ]
    },
    {
        id: 5,
        name: "Downtown Cuisine",
        rating: 4.8,
        restaurant_categories: [1, 2],
        priceRating: affordable,
        photo: images.noodle_shop,
        duration: "15 - 20 min",
        location: {
            latitude: 1.558050496260768,
            longitude: 110.34743759630511,
        },
        courier: {
            avatar: images.avatar_4,
            name: "Muthu"
        },
        categories: [
            {
                id: 1,
                name: "Chicken Burger",
                icon: "",
                items: [
                    {
                        id: 231,
                        name: "Crispy Chicken Burger",
                        photo: images.crispy_chicken_burger,
                        description: "Burger with crispy chicken, cheese and lettuce",
                        calories: 200,
                        price: 10
                    },
                    {
                        id: 245,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 8753,
                        name: "French Fries",
                        photo: images.baked_fries,
                        description: "Crispy Baked French Fries",
                        calories: 194,
                        price: 8
                    }
                ]
            },
            {
                id: 2,
                name: "Beef Burger",
                icon: "",
                items: [
                    {
                        id: 1754,
                        name: "Crispy Chicken Burger",
                        photo: images.crispy_chicken_burger,
                        description: "Burger with crispy chicken, cheese and lettuce",
                        calories: 200,
                        price: 10
                    },
                    {
                        id: 968756,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 23456,
                        name: "Tomato Pasta",
                        photo: images.tomato_pasta,
                        description: "Pasta with fresh tomatoes",
                        calories: 100,
                        price: 10
                    },
                    {
                        id: 34560,
                        name: "Mediterranean Chopped Salad ",
                        photo: images.salad,
                        description: "Finely chopped lettuce, tomatoes, cucumbers",
                        calories: 100,
                        price: 10
                    }
                ]
            },
            {
                id: 3,
                name: "Sandwich",
                icon: "",
                items: [
                    {
                        id: 2498765,
                        name: "Crispy Chicken Burger",
                        photo: images.crispy_chicken_burger,
                        description: "Burger with crispy chicken, cheese and lettuce",
                        calories: 200,
                        price: 10
                    },
                    {
                        id: 12,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 569,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 4567890,
                        name: "French Fries",
                        photo: images.baked_fries,
                        description: "Crispy Baked French Fries",
                        calories: 194,
                        price: 8
                    },
                    {
                        id: 234567897654,
                        name: "Hawaiian Pizza",
                        photo: images.hawaiian_pizza,
                        description: "Canadian bacon, homemade pizza crust, pizza sauce",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 34525362,
                        name: "Tomato & Basil Pizza",
                        photo: images.pizza,
                        description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                        calories: 250,
                        price: 20
                    },
                    {
                        id: 205,
                        name: "Tomato Pasta",
                        photo: images.tomato_pasta,
                        description: "Pasta with fresh tomatoes",
                        calories: 100,
                        price: 10
                    },
                    {
                        id: 234567,
                        name: "Mediterranean Chopped Salad ",
                        photo: images.salad,
                        description: "Finely chopped lettuce, tomatoes, cucumbers",
                        calories: 100,
                        price: 10
                    }
                ]
            }
        ]
    },
    {

        id: 6,
        name: "Downtown Dessets",
        rating: 4.9,
        restaurant_categories: [9, 10],
        priceRating: affordable,
        photo: images.kek_lapis_shop,
        duration: "35 - 40 min",
        location: {
            latitude: 1.5573478487252896,
            longitude: 110.35568783282145,
        },
        courier: {
            avatar: images.profile,
            name: "Jessie"
        },
        categories: [
            {
                id: 1,
                name: "Chicken Burger",
                icon: "",
                items: [
                    {
                        id: 231,
                        name: "Crispy Chicken Burger",
                        photo: images.crispy_chicken_burger,
                        description: "Burger with crispy chicken, cheese and lettuce",
                        calories: 200,
                        price: 10
                    },
                    {
                        id: 245,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 8753,
                        name: "French Fries",
                        photo: images.baked_fries,
                        description: "Crispy Baked French Fries",
                        calories: 194,
                        price: 8
                    }
                ]
            },
            {
                id: 2,
                name: "Beef Burger",
                icon: "",
                items: [
                    {
                        id: 1754,
                        name: "Crispy Chicken Burger",
                        photo: images.crispy_chicken_burger,
                        description: "Burger with crispy chicken, cheese and lettuce",
                        calories: 200,
                        price: 10
                    },
                    {
                        id: 968756,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 23456,
                        name: "Tomato Pasta",
                        photo: images.tomato_pasta,
                        description: "Pasta with fresh tomatoes",
                        calories: 100,
                        price: 10
                    },
                    {
                        id: 34560,
                        name: "Mediterranean Chopped Salad ",
                        photo: images.salad,
                        description: "Finely chopped lettuce, tomatoes, cucumbers",
                        calories: 100,
                        price: 10
                    }
                ]
            },
            {
                id: 3,
                name: "Sandwich",
                icon: "",
                items: [
                    {
                        id: 2498765,
                        name: "Crispy Chicken Burger",
                        photo: images.crispy_chicken_burger,
                        description: "Burger with crispy chicken, cheese and lettuce",
                        calories: 200,
                        price: 10
                    },
                    {
                        id: 12,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 569,
                        name: "Chicken Burger",
                        photo: images.honey_mustard_chicken_burger,
                        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 4567890,
                        name: "French Fries",
                        photo: images.baked_fries,
                        description: "Crispy Baked French Fries",
                        calories: 194,
                        price: 8
                    },
                    {
                        id: 234567897654,
                        name: "Hawaiian Pizza",
                        photo: images.hawaiian_pizza,
                        description: "Canadian bacon, homemade pizza crust, pizza sauce",
                        calories: 250,
                        price: 15
                    },
                    {
                        id: 34525362,
                        name: "Tomato & Basil Pizza",
                        photo: images.pizza,
                        description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                        calories: 250,
                        price: 20
                    },
                    {
                        id: 865,
                        name: "Tomato Pasta",
                        photo: images.tomato_pasta,
                        description: "Pasta with fresh tomatoes",
                        calories: 100,
                        price: 10
                    },
                    {
                        id: 234567,
                        name: "Mediterranean Chopped Salad ",
                        photo: images.salad,
                        description: "Finely chopped lettuce, tomatoes, cucumbers",
                        calories: 100,
                        price: 10
                    }
                ]
            }
        ]

    }


]

const categories = [
    {
        id: 1,
        name: "Burgers",
        icon: icons.hamburger,
    },
    {
        id: 2,
        name: "Pizza",
        icon: icons.pizza,
    },
   
    {
        id: 3,
        name: "Hot Dogs",
        icon: icons.hotdog,
    },
    {
        id: 4,
        name: "Salads",
        icon: icons.salad,
    },
    {
        id: 5,
        name: "Rice",
        icon: icons.rice_bowl,
    },
    {
        id: 6,
        name: "Noodles",
        icon: icons.noodle,
    },
    
    {
        id: 7,
        name: "Snacks",
        icon: icons.fries,
    },
    {
        id: 8,
        name: "Sushi",
        icon: icons.sushi,
    },
    {
        id: 9,
        name: "Desserts",
        icon: icons.donut,
    },
    {
        id: 10,
        name: "Drinks",
        icon: icons.drink,
    },

]

const hamburger = {
    id: 1,
    name: "Hamburger",
    description: "Chicken patty hamburger",
    restaurant_categories: [1, 2],
    price: 15.99,
    calories: 78,
    isFavourite: true,
    image: require("../assets/dummyData/hamburger.png")
}

const hotTacos = {
    id: 2,
    name: "Hot Tacos",
    description: "Mexican tortilla & tacos",
    restaurant_categories: [1, 3],
    price: 10.99,
    calories: 78,
    isFavourite: false,
    image: require("../assets/dummyData/hot_tacos.png")
}

const vegBiryani = {
    id: 3,
    name: "Veg Biryani",
    description: "Indian Vegetable Biryani",
    restaurant_categories: [1, 2, 3],
    price: 10.99,
    calories: 78,
    isFavourite: true,
    image: require("../assets/dummyData/veg_biryani.png")
}

const wrapSandwich = {
    id: 4,
    name: "Wrap Sandwich",
    description: "Grilled vegetables sandwich",
    restaurant_categories: [1, 2],
    price: 10.99,
    calories: 78,
    isFavourite: true,
    image: require("../assets/dummyData/wrap_sandwich.png")
}

const menu = [
    {
        id: 1,
        name: "Featured",
        list: [
            hamburger, hotTacos, vegBiryani,
        ]
    },
    {
        id: 2,
        name: "Nearby you",
        list: [
            hamburger, vegBiryani, wrapSandwich,
        ]
    },
    {
        id: 3,
        name: "Popular",
        list: [
            hamburger, hotTacos, wrapSandwich,
        ]
    },
    {
        id: 4,
        name: "Newest",
        list: [
            hamburger, hotTacos, vegBiryani,
        ]
    },
    {
        id: 5,
        name: "Trending",
        list: [
            hamburger, vegBiryani, wrapSandwich,
        ]
    },
    {
        id: 6,
        name: "Recommended",
        list: [
            hamburger, hotTacos, wrapSandwich,
        ]
    },

]


export default {
    myProfile,
    categories,
    categoryData,
    menu,
    restaurantData
}