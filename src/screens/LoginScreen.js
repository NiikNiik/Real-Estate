import React, { useState } from "react";
import AppText from "../components/Text";
import AppTextInput from "../components/TextInput";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import TextButton from "../components/TextButton";
import Icon from "../assets/Icon";
import Screen from "../components/Screen";
import BackArrowIcon from "../components/BackArrowIcon"; // Adjust the path as needed
import styles from "../config/styles";
import colors from "../config/colors";

const defaultProps = {
  image: require("../assets/loginimage.png"),
  emailPlaceholder: "Enter your email",
  passwordPlaceholder: "Enter your password",
};

const StaticCard = (props) => {
  return (
    <div
      style={{
        width: "40vw",
        height: "99vh",
        backgroundColor: colors.white,
        boxShadow: "2px 0px 10px rgba(3,3,3,0.1)",
        borderRadius: "0 0 6px 0",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "15px", // Added padding
          left: "15px", // Added padding
          cursor: "pointer",
          zIndex: 10, // Ensure the arrow is on the topmost layer
        }}
        onClick={() => props.navigate("home")}
      >
        <BackArrowIcon
          style={{
            color: colors.dark,
            fill: colors.dark,
            fontSize: "30px",
            height: "30px",
            width: "30px",
          }}
        />
      </div>
      {props.children}
    </div>
  );
};

const Image = (props) => {
  return (
    <div
      style={{
        width: "85%",
        height: "50%",
        borderRadius: "24px",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${props.image ?? defaultProps.image})`,
      }}
    >
      {props.children}
    </div>
  );
};

const LoginScreen = (props) => {
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  return (
    <Screen>
      <StaticCard navigate={props.navigate}>
        <Image image={defaultProps.image} />
        {props.children}
      </StaticCard>
      <div
        style={{
          width: "60%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "30px",
              flexDirection: "row",
            }}
          >
            <Icon
              style={{
                color: colors.dark,
                fill: colors.dark,
                fontSize: "40px",
                width: "40px",
                height: "40px",
              }}
            />
            <AppText
              style={{
                marginLeft: "10px",
                fontSize: "48px",
                fontWeight: 700,
                lineHeight: "62px",
                paddingBottom: "25px",
              }}
            >
              GoCasa
            </AppText>
          </div>
          <div style={{ marginBottom: "7px" }}>
            <AppText
              style={{ ...styles.text, fontSize: "14px", fontWeight: "bold" }}
            >
              Email
            </AppText>
            <AppTextInput
              style={{
                width: "600px",
                height: "60px",
                padding: "0px 5px",
                color: colors.dark,
                backgroundColor: colors.white,
                fontSize: "14px",
              }}
              placeholder={defaultProps.emailPlaceholder}
            />
          </div>
          <div style={{ marginBottom: "-15px" }}>
            <AppText
              style={{ ...styles.text, fontSize: "14px", fontWeight: "bold" }}
            >
              Password
            </AppText>
            <AppTextInput
              style={{
                width: "600px",
                height: "60px",
                padding: "0px 5px",
                color: colors.dark,
                backgroundColor: colors.white,
                fontSize: "14px",
              }}
              placeholder={defaultProps.passwordPlaceholder}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "600px",
              marginBottom: "7px",
            }}
          >
            <Checkbox
              style={{
                display: "flex",
                width: "20px",
                height: "20px",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.primary,
                color: colors.white,
              }}
              onChange={setIsRememberMeChecked}
            />
            <AppText
              style={{
                ...styles.text,
                fontSize: "12px",
                marginLeft: "10px",
                fontWeight: isRememberMeChecked ? "bold" : "normal",
              }}
            >
              Remember me
            </AppText>
          </div>
          <div style={{ marginBottom: "7px", paddingTop: "30px" }}>
            <Button
              style={{ width: "600px", height: "60px", padding: "0px 2px" }}
              backgroundColor="#fc8a00"
              color="#ffffff"
              fontSize="16px"
              fontWeight="700"
              label="Log In"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "600px",
              paddingTop: "10px",
            }}
          >
            <TextButton
              style={{
                fontSize: "14px",
                color: colors.primary,
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              Forgot your password?
            </TextButton>
            <TextButton
              style={{
                fontSize: "14px",
                color: colors.primary,
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              New Account?
            </TextButton>
          </div>
        </div>
      </div>
    </Screen>
  );
};

export default LoginScreen;
