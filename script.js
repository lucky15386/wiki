// 这里可以添加交互功能，例如动态加载内容、处理用户输入等
document.addEventListener('DOMContentLoaded', () => {
    console.log("页面已加载");

    // 加载本地存储内容
    loadContent();

    // 获取所有编辑按钮
    const editButtons = document.querySelectorAll('.edit-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.parentElement; // 获取卡片
            const currentText = card.childNodes[0].nodeValue.trim(); // 获取当前文本

            // 提示用户输入新内容
            const newText = prompt("修改内容:", currentText);
            if (newText !== null) {
                card.childNodes[0].nodeValue = newText; // 更新卡片内容
            }
        });
    });

    // 获取所有保存按钮
    const saveButtons = document.querySelectorAll('.edit-btn');
    saveButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.parentElement; // 获取卡片
            const content = card.innerText.trim(); // 获取当前文本
            const sectionId = card.parentElement.id; // 获取所在部分的ID

            // 保存到本地存储
            saveContent(sectionId, content);
            alert(`内容已保存: ${content}`);
        });
    });

    // 获取所有删除按钮
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.parentElement; // 获取卡片
            card.remove(); // 删除卡片
        });
    });

    // 添加新条目
    document.getElementById('add-agent').addEventListener('click', () => addNewItem('干员档案'));
    document.getElementById('add-game').addEventListener('click', () => addNewItem('游戏涉猎'));
    document.getElementById('add-work').addEventListener('click', () => addNewItem('文学作品'));
    document.getElementById('add-event').addEventListener('click', () => addNewItem('团建记录'));

    // 提交评论
    const commentSections = document.querySelectorAll('.comments');
    commentSections.forEach(section => {
        const submitButton = section.querySelector('.submit-comment');
        const textarea = section.querySelector('textarea');
        const commentList = section.querySelector('.comment-list');

        submitButton.addEventListener('click', () => {
            const commentText = textarea.value.trim();
            if (commentText) {
                const commentItem = document.createElement('div');
                commentItem.innerText = commentText;
                commentList.appendChild(commentItem);
                textarea.value = ''; // 清空输入框
            }
        });
    });

    // 处理文件上传
    const uploadMediaButtons = document.querySelectorAll('.upload-media');
    uploadMediaButtons.forEach(upload => {
        upload.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const mediaElement = document.createElement(file.type.startsWith('image/') ? 'img' : 'video');
                    mediaElement.src = e.target.result;
                    mediaElement.controls = true; // 仅对视频有效
                    mediaElement.style.maxWidth = '100%';
                    event.target.parentElement.appendChild(mediaElement);
                };
                reader.readAsDataURL(file);
            }
        });
    });
});

// 加载本地存储内容
function loadContent() {
    const sections = ['干员档案', '游戏涉猎', '文学作品', '团建记录'];
    sections.forEach(section => {
        const content = localStorage.getItem(section);
        if (content) {
            const cardSection = document.getElementById(section);
            const newCard = document.createElement('div');
            newCard.className = 'card';
            newCard.contentEditable = true;
            newCard.innerHTML = `${content} <button class="edit-btn">保存</button> <button class="delete-btn">删除</button>`;
            cardSection.appendChild(newCard);
        }
    });
}

// 保存内容到本地存储
function saveContent(sectionId, content) {
    localStorage.setItem(sectionId, content);
}

// 添加新条目
function addNewItem(sectionId) {
    const cardSection = document.getElementById(sectionId);
    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.contentEditable = true;
    newCard.innerHTML = `新条目 <button class="edit-btn">保存</button> <button class="delete-btn">删除</button>`;
    cardSection.appendChild(newCard);
}
