/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";

async function getShopifyOrders() {
  try {
    let response = await fetch(
      "https://shopicruit.myshopify.com/admin/orders.json?page=1&access_token=c32313df0d0ef512ca64d5b336a0d7c6"
    );
    let responseJson = await response.json();
    return responseJson.orders;
  } catch (error) {
    console.error(error);
  }
}

export default class CountMyMoney extends Component {
  state = { totalRevenue: null, numberACKSold: null };

  checkACKSold(itemSold) {
    if (itemSold.title === "Aerodynamic Cotton Keyboard") {
      return itemSold;
    }
  }

  componentDidMount() {
    const orders = getShopifyOrders();

    const totalRevenue = 0;
    orders.map(order => totalRevenue += order.total_price_usd);

    const numberACKSold = orderss.map(order =>
      order.lineItems.some(checkACKSold)
    ).length;

    this.setState(() => ({ totalRevenue, numberACKSold }));
  }

  render() {
    const { totalRevenue, numberACKSold } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Hello World!
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
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  data: {
    fontSize: 16,
    textAlign: "left",
    paddingLeft: 20,
    margin: 10,
  }
});

AppRegistry.registerComponent("CountMyMoney", () => CountMyMoney);
