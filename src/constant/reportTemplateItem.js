export const reportTemplateItem = (idToAppend) => {
    console.log("id to append is same? " , idToAppend)
    return {
      email_id: idToAppend,
      sender_img_base64:
        "https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
      sender_name: "Outlook",
      sender_email_addr : "Outlook@12345.gmail.com",
      subject: "Phishing Email Reported",
      message: "Thank you for reporting this phishing email to us",
      is_forward_message: false,
      incoming_duration: 0,
      received_time: Math.trunc(Date.now()/1000),
    };
  };