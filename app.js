document.addEventListener('DOMContentLoaded', function() {
    const MessageBox = document.getElementById('MessageBox');
    const MessageInput = document.getElementById('MessageInput');
    const MessageList = document.getElementById('MessageList');
    const PostButton = document.querySelector('#MessageBox button');

    function scrollToBottom() {
        MessageList.scrollTop = MessageList.scrollHeight;
    }
    axios.get('http://localhost:6040/messages')
        .then((response) => {
            const messages = response.data;
            messages.forEach(data => {
                const newMessage = document.createElement('div');
                newMessage.textContent = data.text;
                MessageList.appendChild(newMessage);
            });
            scrollToBottom(); 
        })
        .catch(function(error) {
            console.error('Error sending messages:', error);
        });

    MessageBox.addEventListener('submit', function(event) {
        event.preventDefault();
        const message = MessageInput.value;
        axios.post('http://localhost:6040/messages', { text: message })
            .then(function(response) {
                const newMessage = document.createElement('div');
                newMessage.textContent = response.data.text;
                MessageList.appendChild(newMessage);
                MessageInput.value = '';
                scrollToBottom(); 
            })
            .catch(function(error) {
                console.error('Error sending message:', error); 
            });
    });

    MessageInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) { 
            event.preventDefault(); 
            PostButton.click(); 
        }
    });
});
