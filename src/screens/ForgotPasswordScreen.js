import React from "react";
import AppText from "../components/Text";
import AppTextInput from "../components/TextInput";
import Button from "../components/Button";
import Icon from "../assets/Icon";
import Screen from "../components/Screen";
import BackArrowIcon from "../components/BackArrowIcon";
import styles from "../config/styles";
import colors from "../config/colors";

const defaultProps = {
  image: require("../assets/loginimage.png"),
  emailPlaceholder: "Enter your email",
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
          top: "15px",
          left: "15px",
          cursor: "pointer",
          zIndex: 10,
        }}
        onClick={() => props.navigate("login")}
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

const ForgotPasswordScreen = (props) => {
  return (
    <Screen>
      <StaticCard navigate={props.navigate}>
        <Image image={defaultProps.image} />
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
              Reset Password
            </AppText>
          </div>
          <AppText
            style={{
              ...styles.text,
              fontSize: "16px",
              marginBottom: "20px",
              textAlign: "center",
              maxWidth: "600px",
            }}
          >
            Enter your email address and we'll send you instructions to reset your password.
          </AppText>
          <div style={{ marginBottom: "20px" }}>
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
          <div style={{ marginBottom: "7px", paddingTop: "30px" }}>
            <Button
              style={{ width: "600px", height: "60px", padding: "0px 2px" }}
              backgroundColor="#fc8a00"
              color="#ffffff"
              fontSize="16px"
              fontWeight="700"
              label="Send Reset Instructions"
            />
          </div>
        </div>
      </div>
    </Screen>
  );
};

export default ForgotPasswordScreen;
