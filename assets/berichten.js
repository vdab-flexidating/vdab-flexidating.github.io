
//Constructor om een bericht object te maken
function Message(berichtId, vanId, naarId, bericht, status) {
    this.berichtId = berichtId;
    this.vanId = vanId;
    this.naarId = naarId;
    this.bericht = bericht;
    this.status = status;
}

//Constructor om een Conversation object aan te maken
function Conversation(messages, profile) {
    this.messages = messages;
    this.profile = profile;
}


//jquery onload is gelijk aan window.onload maar beter
$(function () {

    //Niet ingelogd ga redirect index pagina
    if (!gebruiker)
        $(location).attr('href', 'index.html');

    messagesController.loadMessages();

    //Events
    $(".write_msg").keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            messagesController.sendMessageEvent();
        }
    });
    $(".msg_send_btn").click(function () {
        messagesController.sendMessageEvent();
    });


    setTimeout(function () {
        var url = window.location.search;
        if (url.includes('profiel')) {
            var zoek = "?profiel=";
            var begin = url.indexOf(zoek);
            if (begin == -1) return;
            begin += zoek.length;
            var einde = url.length;
            var profileId = url.substring(begin, einde);
            messagesController.sendMessageToNewProfile(profileId);
        }
    }, 500);

});


var messagesController = {
    errorImg: " onerror=\"this.onerror=null;this.src='https://scrumserver.tenobe.org/scrum/img/no_image.png';\" ", //Fallback image if it's not found in the server
    inbox: [],
    addConversation: function (conversation) {
        this.inbox.push(conversation);
    },
    addProfileInfoToConvertion: function (profile) {
        //1. Find the conversation with matching profile id
        //2. Store that profile to the conversation object.

        for (var i = 0; i < this.inbox.length; i++) {

            if (this.inbox[i].profile)
                continue;

            var vanId = this.inbox[i].messages[0].vanId;
            var naarId = this.inbox[i].messages[0].naarId;
            if (vanId == profile.id || naarId == profile.id) {
                this.inbox[i].profile = profile;
                break;
            }
        }


    },
    addConversationToChatList: function (conversation, active = false) {

        //Check if profile is not null
        if (conversation.profile == null)
            return;

        //Check if it's already added to the list
        var countChatListDiv = $(".inbox_chat").find("[data-profileid='" + conversation.profile.id + "']").length;
        if (countChatListDiv > 0)
            return;

        var msg = "";
        if (conversation.messages != null || conversation.messages != undefined) {
            msg = conversation.messages[conversation.messages.length - 1].bericht;
        }

        var $newConversationDiv = $("<div class=\"chat_list\" data-profileId=\"" + conversation.profile.id + "\">" +
            "<div class=\"chat_people\">" +
            "<div class=\"chat_img\"> <img src=\"https://scrumserver.tenobe.org/scrum/img/" + conversation.profile.foto + "\" " + messagesController.errorImg + " alt=\"profile picture\"> </div>" +
            "<div class=\"chat_ib\">" +
            "<h5>" + conversation.profile.voornaam + " " + conversation.profile.familienaam + "</h5>" +
            "<p>" + msg + "</p>" +
            "</div>" +
            "</div>" +
            "</div>");

        //Click event
        $newConversationDiv.click(function () {

            var profileId = $(this).data("profileid");

            //Change css active_chat
            $(".chat_list").removeClass("active_chat");
            $(this).addClass("active_chat");

            console.log("clicked");
            //Display the chat
            messagesController.displayChat(profileId);

        });

        if(active){
            $newConversationDiv.addClass("active_chat");
            $(".write_msg").focus();
        }
         
        //append element to html
        $(".inbox_chat").append($newConversationDiv);


    },
    findConversation: function (profileId) {
        for (var i = 0; i < messagesController.inbox.length; i++) {
          
                if (messagesController.inbox[i].profile.id == profileId.toString())
                    return messagesController.inbox[i];
            
        }

    },
    displayChat: function (profileId) {

        //Clear old conversation
        $(".msg_history").empty();


        var conversation = messagesController.findConversation(profileId);

        if (conversation.messages == null) return;
        for (var i = 0; i < conversation.messages.length; i++) {

            var msg = conversation.messages[i];

            var isSender = (msg.benIkZender == "1");
            var $msgElementDiv;
            if (isSender) {
                $msgElementDiv = $("<div class=\"outgoing_msg\" data-message-id=\"" + msg.berichtId + "\">" +
                    "<div class=\"sent_msg\">" +
                    "<p>" + msg.bericht + "</p>" +
                    "<span class=\"time_date\">" + msg.status + "</span>" +
                    "</div>" +
                    "</div>");
                    $msgElementDiv.click(function(){
                        var messageId = $(this).data("message-id");
                        deleteMessage(messageId).then(function(){
                            messagesController.reset();
                        });
                    });

            } else {
                $msgElementDiv = $("<div class=\"incoming_msg\" data-message-id=\"" + msg.berichtId + "\">" +
                    "<div class=\"incoming_msg_img\">" +
                    "<img src=\"https://scrumserver.tenobe.org/scrum/img/" + conversation.profile.foto + "\" " + messagesController.errorImg + " alt=\"profile picture\">" +
                    "</div>" +
                    "<div class=\"received_msg\">" +
                    "<div class=\"received_withd_msg\">" +
                    "<p>" + msg.bericht + "</p>" +
                    "<span class=\"time_date\">" + msg.status + "</span>" +
                    "</div>" +
                    "</div>" +
                    "</div>");
            }
            

            $(".msg_history").append($msgElementDiv);
        }


        $(".msg_history").scrollTop($(".msg_history")[0].scrollHeight);
    },
    sendMessageEvent: function () {

        //Check there is a active chat
        if ($(".active_chat").length < 1) {
            alert("Kies een persoon om mee te chatten");
            return;
        }

        //Send message
        var msgText = $(".write_msg").val();
        var receiverId = $(".active_chat").data("profileid");
        var senderId = gebruiker.id;
        var message = new Message(null, senderId, receiverId, msgText, "verzonden");
        postMessage(message).then(function () {
            $(".write_msg").val("");
            messagesController.reset();
        });


    },
    initInbox: function () {
        for (var i = 0; i < this.inbox.length; i++) {
            this.addConversationToChatList(this.inbox[i]);
        }
    },
    loadMessages: function () {
        //haal the messages van de api
        requestMessagesFromApi(gebruiker.id).then(function () {
            for (var i = 0; i < messagesController.inbox.length; i++) {

                var firstMessageOfConversation = messagesController.inbox[i].messages[0];

                //     //Find the profile Id
                var profileId = firstMessageOfConversation.vanId;
                if (firstMessageOfConversation.vanId == gebruiker.id)
                    profileId = firstMessageOfConversation.naarId;

                requestProfileFromApi(profileId).then(function () {
                    messagesController.initInbox();
                });
            }
        });

    },
    reset: function () {
        var activeChatId = $(".active_chat").data("profileid");
        $(".inbox_chat").empty();
        $(".msg_history").empty();
        $(".write_msg").val("");
        messagesController.inbox = [];

        messagesController.loadMessages();

        if (activeChatId.length < 1)
            return;

        setTimeout(function () {
            messagesController.displayChat(activeChatId);
            $(".inbox_chat").find("[data-profileid='" + activeChatId + "']").addClass("active_chat");
        }, 400);

    },
    sendMessageToNewProfile(profileId) {

        var profileUrl = rooturl + '/profiel/read_one.php?id=' + profileId;
        fetch(profileUrl).then(response => response.json()).then(function (data) {

            var conversation = new Conversation(null, data);
            messagesController.addConversation(conversation);
            messagesController.addConversationToChatList(conversation,true);
           
        });
    }
}

//API REQUEST FUNCTIONS

//REQUEST MESSAGES
const requestMessagesFromApi = async (profileId) => {
    var url = rooturl + "/bericht/read.php?profielId=" + profileId;
    const data = await fetch(url).then(response => response.json());
    for (var i = 0; i < data.length; i++) {
        var conversation = new Conversation(data[i], null);
        messagesController.addConversation(conversation);
    }
}

const requestProfileFromApi = async (profileId) => {
    var profileUrl = rooturl + '/profiel/read_one.php?id=' + profileId;
    const data = await fetch(profileUrl).then(response => response.json());
    messagesController.addProfileInfoToConvertion(data);
}

const postMessage = async (message) => {
    var url = rooturl + '/bericht/post.php';
    const data = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    }).then(response => response.json());
}

const deleteMessage = async (messageId) => {
    var url = rooturl + '/bericht/delete.php';
    const data = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: "{\"id\":\""+messageId+"\"}"
    }).then(response => response.json());
}