import { useContext } from "react";
import { useState, useEffect } from "react";

import { Box, styled, Typography } from "@mui/material";
import { GetApp as GetAppIcon } from "@mui/icons-material";

import { AccountContext } from "../../../context/AccountProvider";

import { downloadMedia, formatDate } from "../../../utils/common-utils";
import { iconPDF } from "../../../constants/data";
import { isPhishingUrl } from "../../../service/api";

const Wrapper = styled(Box)`
  background: #ffffff;
  padding: 5px;
  max-width: 60%;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;

const Own = styled(Box)`
  background: #dcf8c6;
  padding: 5px;
  max-width: 60%;
  width: fit-content;
  margin-left: auto;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;

const Text = styled(Typography)`
  font-size: 14px;
  padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
  font-size: 10px;
  color: #919191;
  margin-top: 6px;
  word-break: keep-all;
  margin-top: auto;
`;

const Message = ({ message }) => {
  const { account } = useContext(AccountContext);

  return (
    <>
      {account.sub === message.senderId ? (
        <Own>
          {message.type === "file" ? (
            <ImageMessage message={message} />
          ) : (
            <TextMessage message={message} />
          )}
        </Own>
      ) : (
        <Wrapper>
          {message.type === "file" ? (
            <ImageMessage message={message} />
          ) : (
            <TextMessage message={message} />
          )}
        </Wrapper>
      )}
    </>
  );
};

const TextMessage = ({ message }) => {
  const [isPhishing, setIsPhishing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkPhishing = async () => {
      try {
        setIsLoading(true);
        const response = await isPhishingUrl(message);
        console.log(response, "for", message.text);
        setIsPhishing(response);
      } catch (error) {
        console.error("Error while checking phishing:", error);
        setIsPhishing(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (message.text.includes(".")) {
      checkPhishing();
    }
  }, [message]);

  return (
    <>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text style={{ color: isPhishing ? "red" : "blue" }}>
            {message.text}
          </Text>
          <Text>{isPhishing ? "Phishing Site detected" : ""}</Text>
        </div>
      )}

      <Time>{formatDate(message.createdAt)}</Time>
    </>
  );
};

const ImageMessage = ({ message }) => {
  return (
    <div style={{ position: "relative" }}>
      {message?.text?.includes(".pdf") ? (
        <div style={{ display: "flex" }}>
          <img src={iconPDF} alt="pdf-icon" style={{ width: 80 }} />
          <Typography style={{ fontSize: 14 }}>
            {message.text.split("/").pop()}
          </Typography>
        </div>
      ) : (
        <img
          style={{ width: 300, height: "100%", objectFit: "cover" }}
          src={message.text}
          alt={message.text}
        />
      )}
      <Time style={{ position: "absolute", bottom: 0, right: 0 }}>
        <GetAppIcon
          onClick={(e) => downloadMedia(e, message.text)}
          fontSize="small"
          style={{
            marginRight: 10,
            border: "1px solid grey",
            borderRadius: "50%",
          }}
        />
        {formatDate(message.createdAt)}
      </Time>
    </div>
  );
};

export default Message;
