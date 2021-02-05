import React from "react";
import Faker from "faker";
import Assessment from "@material-ui/icons/Assessment";
import Web from "@material-ui/icons/Web";
import BorderOuter from "@material-ui/icons/BorderOuter";


const data = {

  menus: [
    { text: "DashBoard", icon: <Assessment />, link: "/admin/dashboard" },
    { text: "Add User", icon: <Web />, link: "/admin/add-user" },
    { text: "Add Doctor", icon: <Web />, link: "/admin/add-doctor" },
    {
      text: "User Table",
      icon: <BorderOuter />,
      link: "/admin/table/user"
    },
    {
      text: "Doctor Table",
      icon: <BorderOuter />,
      link: "/admin/table/dr"
    },
    {
      text: "Rdv Table",
      icon: <BorderOuter />,
      link: "/admin/table/rdv"
    },
    {
      text: "Payement Table",
      icon: <BorderOuter />,
      link: "/admin/table/payement"
    },
    
  ],
  user: {
    userName: `${Faker.name.firstName()} ${Faker.name.lastName()}`,
    avatar: Faker.image.avatar()
  },
  tablePage: {
    items: Array.from({ length: 105 }, (item, index) => ({
      id: index,
      name: Faker.commerce.productName(),
      price: Faker.commerce.price(),
      category: Faker.commerce.productMaterial()
    }))
  },
  dashBoardPage: {
    recentProducts: [
      {
        id: 1,
        title: "Ilias sanati",
        text: "Khalil Abdelwahab"
      },
      { id: 2, title: "ilias 4", text: "khalil" },
      {
        id: 3,
        title: "ilias",
        text: "abdo "
      },
      {
        id: 4,
        title: "abdo",
        text: "ilias"
      }
    ],
    monthlySales: [
      { name: "Jan", uv: 3700 },
      { name: "Feb", uv: 3000 },
      { name: "Mar", uv: 2000 },
      { name: "Apr", uv: 2780 },
      { name: "May", uv: 2000 },
      { name: "Jun", uv: 1800 },
      { name: "Jul", uv: 2600 },
      { name: "Aug", uv: 2900 },
      { name: "Sep", uv: 3500 },
      { name: "Oct", uv: 3000 },
      { name: "Nov", uv: 2400 },
      { name: "Dec", uv: 2780 }
    ],
    newOrders: [
      { pv: 2400 },
      { pv: 1398 },
      { pv: 9800 },
      { pv: 3908 },
      { pv: 4800 },
      { pv: 3490 },
      { pv: 4300 }
    ],
    browserUsage: [
      { name: "Chrome", value: 800 },
      { name: "Firefox", value: 300 },
      { name: "Safari", value: 300 }
    ]
  }
};

export default data;
