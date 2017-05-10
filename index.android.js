/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";

export default class CountMyMoney extends Component {
  constructor() {
    super();
    this.state = { totalRevenue: null, numberACKSold: null, orders: [] };
  }

  async getShopifyOrders() {
    try {
      let response = await fetch(
        "https://shopicruit.myshopify.com/admin/orders.json?page=1&access_token=c32313df0d0ef512ca64d5b336a0d7c6"
      );
      let responseJson = await response.json();
      this.setState({ orders: responseJson.orders });
      return responseJson.orders.length;
    } catch (error) {
      console.error("error is:" + error);
      return -1;
    }
  }

  componentDidMount() {
    this.getShopifyOrders().then(() => {
      this.getTotalRevenue();
      this.getNumberSold();
    });
  }

  getTotalRevenue() {
    const { orders } = this.state;
    let totalRevenue = 0;
    if (orders.length) {
      orders.map(order => {
        totalRevenue += parseFloat(order.total_price_usd);
      });
    }
    this.setState({ totalRevenue: totalRevenue.toFixed(2) });
  }

  getNumberSold() {
    const { orders } = this.state;
    let count = 0;

    for (let i = 0; i < orders.length; i += 1) {
      for (let j = 0; j < orders[i].line_items.length; j += 1) {
        if (orders[i].line_items[j].title === "Aerodynamic Cotton Keyboard") {
          count += 1;
        }
      }
    }
    this.setState({ numberACKSold: count });
  }

  render() {
    const { totalRevenue, numberACKSold } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Hey Shopify!
        </Text>
        <Text style={styles.data}>
          Total Revenue (in USD): ${totalRevenue}
        </Text>
        <Text style={styles.data}>
          Number of Aerodynamic Cotton Keyboards sold: {numberACKSold}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 36,
    textAlign: "center",
    margin: 10,
    paddingBottom: 104,
  },
  data: {
    fontSize: 16,
    textAlign: "left",
    paddingLeft: 20,
    margin: 10
  }
});

AppRegistry.registerComponent("CountMyMoney", () => CountMyMoney);
