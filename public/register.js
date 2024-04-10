


// <body>
//     <div class="container">
//         <h2>회원가입</h2>
//         <form action="/register" method="POST" id="user-form">
//             <input type="text" id="userid" placeholder="아이디" required><br>
//             <input type="text" id="username" placeholder="사용자명" required><br>
//             <input type="password" id="password" placeholder="비밀번호" required><br>
//             <input type="password" id="confirm_password" placeholder="비밀번호 확인" required><br>
//             <input type="submit" value="가입하기">
//         </form>
//     </div>

document.querySelector('#user-form').addEventListener('submit', async (e)=> {
    e.preventDefault();
    const id = e.target.userid.value;
    const name = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if(!id){
        return alert('아이디를 입력하세요');
    }
    if(!name){
        return alert('닉네임을 입력하세요');
    }
    if(password !== confirmPassword){
        return alert('비밀번호가 일치하지 않습니다.');
    }
    try{
        await axios.post('/register', {userid, username, password});

    } catch(err){
        console.error(err);
    }
})



// // 사용자 이름 눌렀을 때 댓글 로딩
// document.querySelectorAll('#user-list tr').forEach((el) => {
//     el.addEventListener('click', function () {
//       const id = el.querySelector('td').textContent;
//       getComment(id);
//     });
//   });
//   // 사용자 로딩
//   async function getUser() {
//     try {
//       const res = await axios.get('/users');
//       const users = res.data;
//       console.log(users);
//       const tbody = document.querySelector('#user-list tbody');
//       tbody.innerHTML = '';
//       users.map(function (user) {
//         const row = document.createElement('tr');
//         row.addEventListener('click', () => {
//           getComment(user.id);
//         });
//         // 로우 셀 추가
//         let td = document.createElement('td');
//         td.textContent = user.id;
//         row.appendChild(td);
//         td = document.createElement('td');
//         td.textContent = user.name;
//         row.appendChild(td);
//         td = document.createElement('td');
//         td.textContent = user.age;
//         row.appendChild(td);
//         td = document.createElement('td');
//         td.textContent = user.married ? '기혼' : '미혼';
//         row.appendChild(td);
//         tbody.appendChild(row);
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   }
//   // 댓글 로딩
//   async function getComment(id) {
//     try {
//       const res = await axios.get(`/users/${id}/comments`);
//       const comments = res.data;
//       const tbody = document.querySelector('#comment-list tbody');
//       tbody.innerHTML = '';
//       comments.map(function (comment) {
//         // 로우 셀 추가
//         const row = document.createElement('tr');
//         let td = document.createElement('td');
//         td.textContent = comment.id;
//         row.appendChild(td);
//         td = document.createElement('td');
//         td.textContent = comment.User.name;
//         row.appendChild(td);
//         td = document.createElement('td');
//         td.textContent = comment.comment;
//         row.appendChild(td);
//         const edit = document.createElement('button');
//         edit.textContent = '수정';
//         edit.addEventListener('click', async () => { // 수정 클릭 시
//           const newComment = prompt('바꿀 내용을 입력하세요');
//           if (!newComment) {
//             return alert('내용을 반드시 입력하셔야 합니다');
//           }
//           try {
//             await axios.patch(`/comments/${comment.id}`, { comment: newComment });
//             getComment(id);
//           } catch (err) {
//             console.error(err);
//           }
//         });
//         const remove = document.createElement('button');
//         remove.textContent = '삭제';
//         remove.addEventListener('click', async () => { // 삭제 클릭 시
//           try {
//             await axios.delete(`/comments/${comment.id}`);
//             getComment(id);
//           } catch (err) {
//             console.error(err);
//           }
//         });
//         // 버튼 추가
//         td = document.createElement('td');
//         td.appendChild(edit);
//         row.appendChild(td);
//         td = document.createElement('td');
//         td.appendChild(remove);
//         row.appendChild(td);
//         tbody.appendChild(row);
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   }
//   // 사용자 등록 시
//   document.getElementById('user-form').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const name = e.target.username.value;
//     const age = e.target.age.value;
//     const married = e.target.married.checked;
//     if (!name) {
//       return alert('이름을 입력하세요');
//     }
//     if (!age) {
//       return alert('나이를 입력하세요');
//     }
//     try {
//       await axios.post('/users', { name, age, married });
//       getUser();
//     } catch (err) {
//       console.error(err);
//     }
//     e.target.username.value = '';
//     e.target.age.value = '';
//     e.target.married.checked = false;
//   });
//   // 댓글 등록 시
//   document.getElementById('comment-form').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const id = e.target.userid.value;
//     const comment = e.target.comment.value;
//     if (!id) {
//       return alert('아이디를 입력하세요');
//     }
//     if (!comment) {
//       return alert('댓글을 입력하세요');
//     }
//     try {
//       await axios.post('/comments', { id, comment });
//       getComment(id);
//     } catch (err) {
//       console.error(err);
//     }
//     e.target.userid.value = '';
//     e.target.comment.value = '';
//   });