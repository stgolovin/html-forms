document.addEventListener("DOMContentLoaded", function () {
    const chatWidget = document.querySelector(".chat-widget");
    const messagesContainer = document.getElementById("chat-widget__messages");
    const inputElement = document.getElementById("chat-widget__input");
    const badge = document.querySelector(".chat-widget__side-text");
    const closeChatButton = document.querySelector(".chat-widget__close-button");

    let isChatActive = false;
    let lastUserActivityTime = Date.now();

    badge.addEventListener("click", function () {
        chatWidget.classList.toggle("chat-widget_active");
        isChatActive = chatWidget.classList.contains("chat-widget_active");
    });

    function addMessage(text, isClient) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        if (isClient) {
            messageDiv.classList.add("message_client");
        }
        const timeDiv = document.createElement("div");
        timeDiv.classList.add("message__time");
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        timeDiv.textContent = `${hours}:${minutes}`;
        const textDiv = document.createElement("div");
        textDiv.classList.add("message__text");
        textDiv.textContent = text;

        messageDiv.appendChild(timeDiv);
        messageDiv.appendChild(textDiv);
        messagesContainer.appendChild(messageDiv);

        setTimeout(function () {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 0);
        }


    inputElement.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && inputElement.value.trim() !== "") {
            addMessage(inputElement.value, true);
            inputElement.value = ""; 
            lastUserActivityTime = Date.now();
            setTimeout(function () {
                const robotResponses = [
                    "Что вы хотите купить?",
                    "Мы только начали работать, извините за неудобства.",
                    "Какой цвет роз вы предпочитаете?",
                ];
                const randomResponse = robotResponses[Math.floor(Math.random() * robotResponses.length)];
                addMessage(randomResponse, false); 
                lastUserActivityTime = Date.now();
            }, 500);
        }
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });

    closeChatButton.addEventListener("click", function () {
        chatWidget.classList.remove("chat-widget_active");
        isChatActive = false;
    });  

    setInterval(function () {
        if (isChatActive && Date.now() - lastUserActivityTime >= 30000) {
            const robotQuestion = "Вы ещё здесь?";
            addMessage(robotQuestion, false);
            lastUserActivityTime = Date.now()
        }
    }, 1000); 
});
