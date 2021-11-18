import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Pressable,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import Switch from "react-native-switch-pro";
const { width, height } = Dimensions.get("window");

function DaysSwitcher({ setDiscountPercent, setAmount }) {
  // const [activeTabWidth, setActiveTabWidth] = useState();
  const [currentTab, setCurrentTab] = useState(0);
  const [activeBtnWidth1, setActiveBtnWidth1] = useState();
  const [activeBtnWidth2, setActiveBtnWidth2] = useState();
  const ballAnimatedValue = useRef(new Animated.Value(0)).current;

  const [isON, SetisOn] = useState(false);

  const toggleisOnOff = (isON) => {
    SetisOn(!isON);
  };

  const moveBall = (toValue) => {
    Animated.timing(ballAnimatedValue, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const xVal = ballAnimatedValue.interpolate({
    inputRange: [0, 10],
    outputRange: [1.5, 16.5],
  });

  const animStyle = {
    transform: [{ translateX: xVal }],
  };
  return (
    <View style={styles.daysSwitcher}>
      {isON === false ? (
        <View
          style={{
            width: 33,
            height: 18,
            justifyContent: "center",
            borderRadius: 10,
            position: "absolute",
            backgroundColor: "#75727B",
          }}
        >
          <Animated.View
            style={[
              {
                position: "absolute",
                backgroundColor: "#fff",
                width: 15,
                height: 15,
                // width: activeTabWidth || activeBtnWidth1,
                borderRadius: 20,
              },
              animStyle,
            ]}
          ></Animated.View>
        </View>
      ) : (
        <LinearGradient
          colors={["#21a172", "#30c07d"]}
          style={{
            width: 33,
            height: 18,
            justifyContent: "center",
            borderRadius: 10,
            position: "absolute",
          }}
        >
          <Animated.View
            style={[
              {
                position: "absolute",
                backgroundColor: "#fff",
                width: 15,
                height: 15,
                // width: activeTabWidth || activeBtnWidth1,
                borderRadius: 20,
              },
              animStyle,
            ]}
          ></Animated.View>
        </LinearGradient>
      )}

      <TouchableOpacity
        // onLayout={(evt) => {
        //   const { width } = evt.nativeEvent.layout;
        //   setActiveBtnWidth1(width);
        // }}

        style={[
          styles.sliderBtn,
          {
            width: 20,
            paddingVertical: 10,
            // backgroundColor: 'red',
            // position: 'absolute',
          },
        ]}
        hitSlop={{ top: 5, bottom: 5, left: 5 }}
        onPress={() => {
          setCurrentTab(0);
          setDiscountPercent(true);
          setAmount();
          // setActiveTabWidth(activeBtnWidth1);
          moveBall(0);
          toggleisOnOff(true);
        }}
      ></TouchableOpacity>

      <TouchableOpacity
        // onLayout={(evt) => {
        //   const { width } = evt.nativeEvent.layout;
        //   setActiveBtnWidth2(width);
        // }}
        style={[
          styles.sliderBtn,
          {
            width: (width - 32 * 2) / 25,
            paddingVertical: 10,
            // backgroundColor: 'green',
            height: 10,
          },
        ]}
        hitSlop={{ top: 5, bottom: 5, right: 5 }}
        onPress={() => {
          setCurrentTab(1);
          setDiscountPercent(false);
          moveBall(10);
          setAmount();
          // setActiveTabWidth(activeBtnWidth2);
          toggleisOnOff(false);
        }}
      ></TouchableOpacity>
    </View>
  );
}

export default function ToggleSwitch({
  underlayColor,
  hitSlop,

  disabled,
  style,
  type,
  hover,
  active,

  textStyle,

  highlight,

  borderColor,
  marked,
}) {
  const [amount, setAmount] = useState();
  const [isDiscountPercent, setIsDiscountPercent] = useState(true);
  const RenderChildren = () => {
    const [isSelected, SetSelected] = useState(false);
    const [value, setState] = useState(false);

    const toggleCheckmark = () => {
      SetSelected(!isSelected);
    };

    // if (type === 'isEmphisized') {
    return (
      <View
        style={{
          marginTop: 50,
          width: 50,
          height: 18,
          // borderColor: '#D5D3D6',
          justifyContent: "center",
          alignItems: "center",
        }}
        borderColor={borderColor}
      >
        {/*<LinearGradient*/}
        {/*	colors={['#21A172', '#30C07D']}*/}
        {/*	style={{ borderRadius: 9, width: 33, height: 18 }}*/}
        {/*>*/}
        <Pressable
          android_ripple={{ color: "black", borderless: true }}
          style={[
            // styles.close,
            style,
            {
              width: 33,
              height: 18,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
          underlayColor={underlayColor}
          onPress={() => {
            toggleCheckmark();
          }}
          highlight={highlight}
          disabled={disabled ? true : false}
          hitSlop={hitSlop}
          hover={hover}
          active={active}
        >
          {/*BackgroundColor === light ? 'white' : darkBg ? "dark" : grey*/}

          {type === "isEmphisized" ? (
            disabled ? (
              <Pressable
                style={{
                  backgroundColor: "white",
                  width: 33,
                  height: 18,

                  borderWidth: 2,
                  borderColor: "#A4A1AA",
                  borderRadius: 9,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Switch
                  style={{
                    backgroundColor: "#D5D3D6",
                    width: 33,
                    height: 18,
                  }}
                  value={value}
                  onAsyncPress={(callback) => {
                    callback(true, (value) => ({ value }));
                  }}
                  circleStyle={{ height: 15, width: 15 }}
                />
              </Pressable>
            ) : isSelected ? (
              //
              <Switch
                style={{
                  // backgroundColor: '#75727B',
                  width: 33,
                  height: 18,
                }}
                value={value}
                onAsyncPress={(callback) => {
                  callback(true, (value) => ({ value }));
                }}
                circleStyle={{ height: 15, width: 15 }}
                backgroundInactive={"#75727B"}
                backgroundActive={["#21A172", "#30C07D"]}
              />
            ) : (
              // <LinearGradient
              // 	colors={['#21A172', '#30C07D']}
              // 	style={{ borderRadius: 9, width: 18, height: 18 }}
              // >
              <Switch
                style={{
                  // backgroundColor: '#75727B',
                  width: 33,
                  height: 18,
                }}
                value={value}
                onAsyncPress={(callback) => {
                  callback(true, (value) => ({ value }));
                }}
                circleStyle={{ height: 15, width: 15 }}
                backgroundInactive={"#75727B"}
                backgroundActive={"#21A172"}
              />

              // </LinearGradient>
            )
          ) : disabled ? (
            <Pressable
              style={{
                backgroundColor: "white",
                width: 33,
                height: 18,

                borderWidth: 2,
                borderColor: "#A4A1AA",
                borderRadius: 9,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => toggleCheckmark()}
            ></Pressable>
          ) : (
            <Pressable
              style={{
                width: 33,
                height: 18,
                backgroundColor: "white",
                borderWidth: 2,
                // borderColor: '#75727B',
                borderRadius: 9,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => toggleCheckmark()}
            >
              <Switch
                style={{
                  // backgroundColor: '#75727B',
                  width: 33,
                  height: 18,
                }}
                value={value}
                onAsyncPress={(callback) => {
                  callback(true, (value) => ({ value }));
                }}
                circleStyle={{ height: 15, width: 15 }}
                backgroundActive={"#2B292B"}
                backgroundInactive={"#75727B"}
              />
            </Pressable>
          )}
        </Pressable>
        {/*</LinearGradient>*/}
      </View>
    );
  };

  const labelStyle = [
    styles.label,
    textStyle,
    disabled && styles.disabled,
    { color: "black" },
  ];

  return (
    <DaysSwitcher
      setDiscountPercent={setIsDiscountPercent}
      setAmount={setAmount}
    />
  );
}

const styles = StyleSheet.create({
  close: {
    borderRadius: 14,
    // backgroundColor: 'black',
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
    color: "white",
    flexShrink: 1,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  daysSwitcher: {
    marginBottom: 24,
    flexDirection: "row",
    width: "100%",
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // backgroundColor: '#F7F8FC',
    borderRadius: 20,
    height: 40,
    marginTop: 49,
  },
});

//
// function DaysSwitcher({ setDiscountPercent, setAmount }) {
// 	// const [activeTabWidth, setActiveTabWidth] = useState();
// 	const [currentTab, setCurrentTab] = useState(0);
// 	const [activeBtnWidth1, setActiveBtnWidth1] = useState();
// 	const [activeBtnWidth2, setActiveBtnWidth2] = useState();
// 	const ballAnimatedValue = useRef(new Animated.Value(0)).current;
//
// 	const moveBall = (toValue) => {
// 		Animated.timing(ballAnimatedValue, {
// 			toValue: toValue,
// 			duration: 300,
// 			useNativeDriver: false,
// 		}).start();
// 	};
//
// 	const xVal = ballAnimatedValue.interpolate({
// 		inputRange: [0, 1],
// 		outputRange: [0, 250],
// 	});
//
// 	const animStyle = {
// 		transform: [{ translateX: xVal }],
// 	};
// 	return (
// 		<LinearGradient
// 			colors={['#21a172', '#30c07d']}
// 			style={{
// 				flexDirection: 'row',
// 				height: 18,
// 				width: 33,
// 				marginTop: 49,
// 				justifyContent: 'center',
// 				marginLeft: 50,
// 				alignItems: 'center',
// 				// paddingTop: 24,
// 				borderRadius: 9,
// 			}}
// 		>
// 			<View style={styles.daysSwitcher}>
// 				<Animated.View
// 					style={[
// 						{
// 							// position: 'absolute',
// 							backgroundColor: '#fff',
// 							width: 15,
// 							// width: activeTabWidth || activeBtnWidth1,
// 							height: 15,
// 							borderRadius: 7,
// 							marginTop: 23.8,
// 							marginLeft: 1,
// 						},
// 						animStyle,
// 					]}
// 				></Animated.View>
//
// 				<TouchableOpacity
// 					style={[styles.sliderBtn, { width: 10, Color: 'red' }]}
// 					hitSlop={{ top: 5, bottom: 5, left: 5 }}
// 					onPress={() => {
// 						setCurrentTab(0);
// 						setDiscountPercent(true);
// 						setAmount();
// 						// setActiveTabWidth(activeBtnWidth1);
// 						moveBall(0);
// 					}}
// 				></TouchableOpacity>
// 				<TouchableOpacity
// 					// onLayout={(evt) => {
// 					//   const { width } = evt.nativeEvent.layout;
// 					//   setActiveBtnWidth2(width);
// 					// }}
// 					style={[styles.sliderBtn, { width: 10 }]}
// 					hitSlop={{ top: 5, bottom: 5, right: 5 }}
// 					onPress={() => {
// 						setCurrentTab(1);
// 						setDiscountPercent(false);
// 						moveBall(10);
// 						setAmount();
// 						// setActiveTabWidth(activeBtnWidth2);
// 					}}
// 				>
// 					{/*<Text*/}
// 					{/*	style={[*/}
// 					{/*		styles.tabText,*/}
// 					{/*		{ color: currentTab == 1 ? colors.white : colors.black },*/}
// 					{/*	]}*/}
// 					{/*	type="bold"*/}
// 					{/*>*/}
// 					{/*	dsa*/}
// 					{/*</Text>*/}
// 				</TouchableOpacity>
// 			</View>
// 		</LinearGradient>
// 	);
// }

//  აქ არი თითქოს ხტუნავი
// <LinearGradient
// 	colors={['#21a172', '#30c07d']}
// 	style={{
// 		flexDirection: 'row',
// 		height: 18,
// 		width: 33,
// 		marginTop: 49,
// 		justifyContent: 'center',
// 		marginLeft: 50,
// 		alignItems: 'center',
// 		// paddingTop: 24,
// 		borderRadius: 9,
// 	}}
// >
// 	<View style={styles.daysSwitcher}>
// 		<Animated.View
// 			style={[
// 				{
// 					// position: 'absolute',
// 					backgroundColor: '#fff',
// 					width: 15,
// 					// width: activeTabWidth || activeBtnWidth1,
// 					height: 15,
// 					borderRadius: 7,
// 					marginTop: 23.8,
// 					marginLeft: 1.5,
// 				},
// 				animStyle,
// 			]}
// 		></Animated.View>
//
// 		<TouchableOpacity
// 			style={[styles.sliderBtn, { width: 15, height: 50 }]}
// 			hitSlop={{ top: 5, bottom: 5, left: 5 }}
// 			onPress={() => {
// 				setCurrentTab(0);
// 				setDiscountPercent(true);
// 				setAmount();
// 				// setActiveTabWidth(activeBtnWidth1);
// 				moveBall(0);
// 			}}
// 		></TouchableOpacity>
// 		<TouchableOpacity
// 			// onLayout={(evt) => {
// 			//   const { width } = evt.nativeEvent.layout;
// 			//   setActiveBtnWidth2(width);
// 			// }}
// 			style={[
// 				styles.sliderBtn,
// 				{
// 					width: 10,
// 					backgroundColor: 'red',
// 					height: 140,
// 					marginLeft: 0,
// 				},
// 			]}
// 			hitSlop={{ top: 5, bottom: 5, right: 5 }}
// 			onPress={() => {
// 				setCurrentTab(1);
// 				setDiscountPercent(false);
// 				moveBall(5);
// 				setAmount();
// 				// setActiveTabWidth(activeBtnWidth2);
// 			}}
// 		></TouchableOpacity>
// 	</View>
// </LinearGradient>

import { getCurrentLanguage } from "localization";

export const changeLanguage = () => {
  const lang = getCurrentLanguage();
  let languageId = 1;
  switch (lang) {
    case "ka":
    case "ka-mg":
    case "ka-sv":
      languageId = 1;
      break;
    case "en":
      languageId = 2;
      break;
    case "ru":
    case "az":
    case "hy":
      languageId = 3;
      break;
  }
  return languageId;
};
