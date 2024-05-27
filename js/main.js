
/*더보기 버튼*/
const moreListPic = document.querySelector('.more-images');
const btnMoreImgs = document.querySelector('.button-more');
let pageNum = 1;

btnMoreImgs.addEventListener('click',()=>{fetchImages(pageNum+=1)});

async function fetchImages(page){
  try{
    const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=6`);

    if(!response.ok){
      throw new Error('네트워크 응답에 문제가 있습니다.');
    }

    // 제이슨 데이터를 자바스크립트 객체로 파싱
    const datas = await response.json();
    console.log(datas);
    makeImageList(datas);

  }catch(error){
    console.error(error);
  }
}

function makeImageList(datas){
  datas.forEach((data)=>{
    moreListPic.insertAdjacentHTML('beforeend', `<li class="img-width"><img src="${data.download_url}" alt=""></li>`);
  });
}

/*지도*/
const mapContainer = document.getElementById('map');
const options = {
  center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
  level: 3 //지도의 레벨(확대, 축소 정도)
};
const map = new kakao.maps.Map(mapContainer, options); //지도 생성

//마커
const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
const marker = new kakao.maps.Marker({
  position: markerPosition
});
marker.setMap(map);//마커가 지도 위해 표시되도록 설정
//윈도우 리사이즈 이벤트 리스너
window.addEventListener('resize', function() {
  map.relayout(); // 지도 크기 재조정
});

/*모달*/
const modal = document.querySelector('.modal');
const modalOpen = document.querySelector('.modal-open');
const modalCloses = document.querySelectorAll('.modal-close');
const modalPopup = document.querySelector('.modal-popup');
const modalWarning = document.querySelector('.modal-warning');


modalOpen.addEventListener('click', function(){
  let subscribeEmail = document.getElementById('subscribe-mail').value;
  if(subscribeEmail == null || subscribeEmail===''){
    //alert("이메일을 입력해주세요");
    modal.style.display = 'block';
    modalPopup.style.display = 'none';
    modalWarning.style.display = 'block';
  }else {
    modal.style.display = 'block';
    modalPopup.style.display = 'block';
    modalWarning.style.display = 'none';
  }
});
modalCloses.forEach((btn)=>{
  btn.addEventListener('click', ()=> {
    console.log('모달 닫기');
    modal.style.display = 'none';
  })
});

/*반응형 헤더 목록 버튼*/
const mobileNavOpenBtn = document.querySelector('.nav-open-toggle');
const mobileNavMenu = document.querySelector('.mobile-header-nav');
const mobileNavCloseBtn = document.querySelector('.nav-close-toggle');

mobileNavOpenBtn.addEventListener('click', ()=>{
  console.log('모바일 메뉴 목록 버튼 클릭');
  mobileNavMenu.style.display = 'block';
  mobileNavCloseBtn.style.display='block';
  mobileNavOpenBtn.style.display = 'none';
});

mobileNavCloseBtn.addEventListener('click', () =>{
  console.log('모바일 nav 메뉴 목록 닫기 버튼');
  mobileNavMenu.style.display = 'none';
  mobileNavCloseBtn.style.display='none';
  mobileNavOpenBtn.style.display = 'block';
})
