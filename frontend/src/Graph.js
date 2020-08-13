import React, { Component } from 'react';
import Graph from "react-graph-vis";

const graph = {
  nodes: [
    { id: 1, label: "Cartago", color: "#28def7" },
    { id: 2, label: "Parrita", color: "#28def7" },
    { id: 3, label: "Vietnam", color: "#28def7" },
    { id: 4, label: "Hojancha", color: "#28def7" },
    { id: 5, label: "Ventormenta", color: "#28def7" }
  ],
  edges: [{ from: 1, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 }, { from: 2, to: 5 }, { from: 3, to: 1 }],

  
};

const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
  }
};

const events = {
  select: function(event) {
    var { nodes, edges } = event;
    console.log("Selected nodes:");
    console.log(nodes);
    console.log("Selected edges:");
    console.log(edges);
  }
};

export default graph