import React, { useState } from 'react';

const ChickenOrder = () => {
  const [legs, setLegs] = useState(0);
  const [wings, setWings] = useState(0);
  const [flesh, setFlesh] = useState(0);
  const [result, setResult] = useState(null);

  const handleOrder = () => {
    const totalLegs = parseInt(legs);
    const totalWings = parseInt(wings);
    const totalFlesh = parseInt(flesh);

    // Call function to calculate inventory details
    const calculation = calculateOrder(totalLegs, totalWings, totalFlesh);
    setResult(calculation);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Chicken Order Management</h1>
      <div className="flex flex-col mb-6 space-y-4">
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Number of Legs (250g each)</label>
          <input
            type="number"
            value={legs}
            onChange={(e) => setLegs(e.target.value)}
            className="p-2 border rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Number of Wings (250g each)</label>
          <input
            type="number"
            value={wings}
            onChange={(e) => setWings(e.target.value)}
            className="p-2 border rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Number of Flesh Portions (1kg each)</label>
          <input
            type="number"
            value={flesh}
            onChange={(e) => setFlesh(e.target.value)}
            className="p-2 border rounded-lg"
          />
        </div>
        <button
          onClick={handleOrder}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        >
          Calculate Order
        </button>
      </div>

      {result && (
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-4">Order Summary:</h2>
          <p>Total Weight of Order: {result.totalOrderWeight} kg</p>
          <p>Whole Chickens Needed: {result.wholeChickens}</p>
          <p>Remaining Legs: {result.remainingParts.legs} (Weight: {result.remainingWeight.legs} kg)</p>
          <p>Remaining Wings: {result.remainingParts.wings} (Weight: {result.remainingWeight.wings} kg)</p>
          <p>Remaining Flesh Portions: {result.remainingParts.flesh} (Weight: {result.remainingWeight.flesh} kg)</p>
          <p>Total Remaining Inventory Weight: {result.totalRemainingWeight} kg</p>
        </div>
      )}
    </div>
  );
};

// Helper function to calculate inventory
const calculateOrder = (legs, wings, flesh) => {
  const legsPerChicken = 2;
  const wingsPerChicken = 2;
  const fleshPerChicken = 1;

  const legsWeightPerPart = 0.25; // kg
  const wingsWeightPerPart = 0.25; // kg
  const fleshWeightPerPart = 1.0; // kg

  const totalLegsWeight = legs * legsWeightPerPart;
  const totalWingsWeight = wings * wingsWeightPerPart;
  const totalFleshWeight = flesh * fleshWeightPerPart;

  const totalOrderWeight = totalLegsWeight + totalWingsWeight + totalFleshWeight;

  // Calculate the number of whole chickens needed
  const wholeChickensForLegs = Math.ceil(legs / legsPerChicken);
  const wholeChickensForWings = Math.ceil(wings / wingsPerChicken);
  const wholeChickensForFlesh = Math.ceil(flesh / fleshPerChicken);

  const wholeChickens = Math.max(wholeChickensForLegs, wholeChickensForWings, wholeChickensForFlesh);

  // Calculate remaining parts after fulfilling the order
  const remainingLegs = (wholeChickens * legsPerChicken) - legs;
  const remainingWings = (wholeChickens * wingsPerChicken) - wings;
  const remainingFlesh = (wholeChickens * fleshPerChicken) - flesh;

  const remainingLegsWeight = remainingLegs * legsWeightPerPart;
  const remainingWingsWeight = remainingWings * wingsWeightPerPart;
  const remainingFleshWeight = remainingFlesh * fleshWeightPerPart;

  const totalRemainingWeight = remainingLegsWeight + remainingWingsWeight + remainingFleshWeight;

  return {
    totalOrderWeight,
    wholeChickens,
    remainingParts: {
      legs: remainingLegs,
      wings: remainingWings,
      flesh: remainingFlesh,
    },
    remainingWeight: {
      legs: remainingLegsWeight,
      wings: remainingWingsWeight,
      flesh: remainingFleshWeight,
    },
    totalRemainingWeight,
  };
};

export default ChickenOrder;
