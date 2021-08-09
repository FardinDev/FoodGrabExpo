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
        categories: [1,2,3],
        priceRating: affordable,
        photo: images.burger_restaurant_1,
        duration: "30 - 45 min",
        location: {
            latitude: 1.5347282806345879,
            longitude: 110.35632207358996,
        },
        courier: {
            avatar: images.avatar_1,
            name: "Amy"
        },
        menu: [
            {
                id: 1,
                name: "Crispy Chicken Burger",
                photo: images.crispy_chicken_burger,
                description: "Burger with crispy chicken, cheese and lettuce",
                calories: 200,
                price: 10
            },
            {
                id: 2,
                name: "Chicken Burger",
                photo: images.honey_mustard_chicken_burger,
                description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                calories: 250,
                price: 15
            },
            {
                id: 3,
                name: "French Fries",
                photo: images.baked_fries,
                description: "Crispy Baked French Fries",
                calories: 194,
                price: 8
            },
            {
                id: 4,
                name: "Hawaiian Pizza",
                photo: images.hawaiian_pizza,
                description: "Canadian bacon, homemade pizza crust, pizza sauce",
                calories: 250,
                price: 15
            },
            {
                id: 5,
                name: "Tomato & Basil Pizza",
                photo: images.pizza,
                description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                calories: 250,
                price: 20
            },
            {
                id: 6,
                name: "Tomato Pasta",
                photo: images.tomato_pasta,
                description: "Pasta with fresh tomatoes",
                calories: 100,
                price: 10
            },
            {
                id: 7,
                name: "Mediterranean Chopped Salad ",
                photo: images.salad,
                description: "Finely chopped lettuce, tomatoes, cucumbers",
                calories: 100,
                price: 10
            },
            {
                id: 8,
                name: "Crispy Chicken Burger",
                photo: images.crispy_chicken_burger,
                description: "Burger with crispy chicken, cheese and lettuce",
                calories: 200,
                price: 10
            },
            {
                id: 9,
                name: "Chicken Burger",
                photo: images.honey_mustard_chicken_burger,
                description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                calories: 250,
                price: 15
            },
            {
                id: 10,
                name: "French Fries",
                photo: images.baked_fries,
                description: "Crispy Baked French Fries",
                calories: 194,
                price: 8
            },
            {
                id: 11,
                name: "Hawaiian Pizza",
                photo: images.hawaiian_pizza,
                description: "Canadian bacon, homemade pizza crust, pizza sauce",
                calories: 250,
                price: 15
            },
            {
                id: 12,
                name: "Tomato & Basil Pizza",
                photo: images.pizza,
                description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                calories: 250,
                price: 20
            },
            {
                id: 13,
                name: "Tomato Pasta",
                photo: images.tomato_pasta,
                description: "Pasta with fresh tomatoes",
                calories: 100,
                price: 10
            },
            {
                id: 14,
                name: "Mediterranean Chopped Salad ",
                photo: images.salad,
                description: "Finely chopped lettuce, tomatoes, cucumbers",
                calories: 100,
                price: 10
            },
        ]
    },
    {
        id: 2,
        name: "Downtown Pizza",
        rating: 4.8,
        categories: [2, 4, 6],
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
        menu: [
            {
                id: 4,
                name: "Hawaiian Pizza",
                photo: images.hawaiian_pizza,
                description: "Canadian bacon, homemade pizza crust, pizza sauce",
                calories: 250,
                price: 15
            },
            {
                id: 5,
                name: "Tomato & Basil Pizza",
                photo: images.pizza,
                description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                calories: 250,
                price: 20
            },
            {
                id: 6,
                name: "Tomato Pasta",
                photo: images.tomato_pasta,
                description: "Pasta with fresh tomatoes",
                calories: 100,
                price: 10
            },
            {
                id: 7,
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
        name: "Downtown Hotdogs",
        rating: 4.8,
        categories: [3],
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
        menu: [
            {
                id: 8,
                name: "Chicago Style Hot Dog",
                photo: images.chicago_hot_dog,
                description: "Fresh tomatoes, all beef hot dogs",
                calories: 100,
                price: 20
            }
        ]
    },
    {
        id: 4,
        name: "Downtown Sushi",
        rating: 4.8,
        categories: [8],
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
        menu: [
            {
                id: 9,
                name: "Sushi sets",
                photo: images.sushi,
                description: "Fresh salmon, sushi rice, fresh juicy avocado",
                calories: 100,
                price: 50
            }
        ]
    },
    {
        id: 5,
        name: "Downtown Cuisine",
        rating: 4.8,
        categories: [1, 2],
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
        menu: [
            {
                id: 10,
                name: "Kolo Mee",
                photo: images.kolo_mee,
                description: "Noodles with char siu",
                calories: 200,
                price: 5
            },
            {
                id: 11,
                name: "Sarawak Laksa",
                photo: images.sarawak_laksa,
                description: "Vermicelli noodles, cooked prawns",
                calories: 300,
                price: 8
            },
            {
                id: 12,
                name: "Nasi Lemak",
                photo: images.nasi_lemak,
                description: "A traditional Malay rice dish",
                calories: 300,
                price: 8
            },
            {
                id: 13,
                name: "Nasi Briyani with Mutton",
                photo: images.nasi_briyani_mutton,
                description: "A traditional Indian rice dish with mutton",
                calories: 300,
                price: 8
            },

        ]
    },
    {

        id: 6,
        name: "Downtown Dessets",
        rating: 4.9,
        categories: [9, 10],
        priceRating: affordable,
        photo: images.kek_lapis_shop,
        duration: "35 - 40 min",
        location: {
            latitude: 1.5573478487252896,
            longitude: 110.35568783282145,
        },
        courier: {
            avatar: images.avatar_1,
            name: "Jessie"
        },
        menu: [
            {
                id: 12,
                name: "Teh C Peng",
                photo: images.teh_c_peng,
                description: "Three Layer Teh C Peng",
                calories: 100,
                price: 2
            },
            {
                id: 13,
                name: "ABC Ice Kacang",
                photo: images.ice_kacang,
                description: "Shaved Ice with red beans",
                calories: 100,
                price: 3
            },
            {
                id: 14,
                name: "Kek Lapis",
                photo: images.kek_lapis,
                description: "Layer cakes",
                calories: 300,
                price: 20
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
    categories: [1, 2],
    price: 15.99,
    calories: 78,
    isFavourite: true,
    image: require("../assets/dummyData/hamburger.png")
}

const hotTacos = {
    id: 2,
    name: "Hot Tacos",
    description: "Mexican tortilla & tacos",
    categories: [1, 3],
    price: 10.99,
    calories: 78,
    isFavourite: false,
    image: require("../assets/dummyData/hot_tacos.png")
}

const vegBiryani = {
    id: 3,
    name: "Veg Biryani",
    description: "Indian Vegetable Biryani",
    categories: [1, 2, 3],
    price: 10.99,
    calories: 78,
    isFavourite: true,
    image: require("../assets/dummyData/veg_biryani.png")
}

const wrapSandwich = {
    id: 4,
    name: "Wrap Sandwich",
    description: "Grilled vegetables sandwich",
    categories: [1, 2],
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