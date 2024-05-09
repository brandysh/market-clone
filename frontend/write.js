const form = document.getElementById("write-form");

const handleSubmitForm = async (event) => {
  event.preventDefault();

  const body = new FormData(form);
  body.append("insertAt", new Date().getTime());

  try {
    const res = await fetch("/items", {
      method: "POST",
      body, // body: body와 동일
    });

    const data = await res.json();
    if (data === "200") window.location.pathname = "/";
  } catch (e) {
    console.error("이미지 업로드 실패");
  }
};

form.addEventListener("submit", handleSubmitForm);
