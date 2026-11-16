/* 교토 동선 탭: 지도 + 사진 + 추천 동선 + 순서 편집 + 이동 시간(대략). index.html이 KyotoRoute.init / connect 를 불러요. */
(function(){
'use strict';
const PH='kyoto/';
/* rsv.lv 0 예약 불필요 · 1 예약 권장/확인 · 2 예약 필수에 가까움 / photo.lv 0 자유 · 1 일부 금지 · 2 주의 많음 */
const PLACES=[
{id:'sannen',n:'산넨자카·니넨자카',jp:'産寧坂',area:'히가시야마',lat:34.9965,lng:135.7808,ph:['b11.jpg','b12.jpg'],stay:70,
 hours:'골목은 24시간 · 가게는 보통 10:00~18:00',fee:'무료',
 rsv:{lv:0,t:'예약 필요 없음'},
 photo:{lv:1,t:'골목 사진은 자유. 다만 가게 안·남의 집 대문 앞·마이코/게이코를 허락 없이 찍는 건 금지예요. 기온 쪽 사유 골목은 촬영 금지 표지(벌금 1만엔)가 있으니 표지를 꼭 확인하세요.'},
 feat:'야사카탑(호칸지)이 보이는 돌계단 골목. 기모노 사진의 정석이고, 우산 든 사진처럼 비 오는 날도 예뻐요.',
 how:'시버스 206·86번 기요미즈미치 정류장에서 도보 7분 · 게이한 기요미즈고조역 도보 20분',
 kimono:'아주 좋음 — 기모노 사진이 제일 잘 나오는 동네예요. 돌계단이 미끄러우니 조리 조심.',
 tip:'10시 넘으면 사람이 급격히 늘어요. 도착하자마자 여기부터 찍는 게 좋아요. 야사카탑 뷰는 야사카도리 아래쪽에서.'},
{id:'kiyomizu',n:'기요미즈데라',jp:'清水寺',area:'히가시야마',lat:34.9949,lng:135.7850,ph:['k1.jpg','k2.jpg'],cr:'사진: Martin Falbisoner / Wikimedia Commons (CC BY-SA 4.0)',stay:70,open:'6:00',last:'17:30',
 hours:'6:00~18:00 · 야간 특별 관람 11/21~30은 21:30까지(입장 21:00)',fee:'500엔',
 rsv:{lv:0,t:'예약 필요 없음'},
 photo:{lv:1,t:'무대·경내·삼층탑은 촬영 OK. 본당 안쪽 불상은 촬영 금지이고 삼각대·셀카봉은 금지예요.'},
 feat:'절벽 위 나무 무대(기요미즈의 무대)로 유명한 교토 대표 절. 단풍철엔 무대 아래가 붉게 물들고, 오쿠노인 쪽에서 무대와 시내가 한 장에 담겨요.',
 how:'산넨자카 위쪽 끝에서 도보 5분 · 시버스 206·86번 기요미즈미치/고조자카 정류장에서 오르막 도보 10~15분',
 kimono:'아주 좋음 — 산넨자카 바로 위예요. 오르막과 계단이 많아 천천히.',
 tip:'낮엔 매우 붐벼요. 산넨자카와 붙여서 가고, 사람 적은 사진은 오픈 직후가 좋아요. 반납 시간이 없으니 야간 관람도 기모노 입은 채로 갈 수 있어요.'},
{id:'yasaka',n:'야사카 신사',jp:'八坂神社',area:'기온',lat:35.0037,lng:135.7785,ph:['y1.jpg','y2.jpg'],cr:'사진: Jakub Hałun (CC BY 4.0), Kanchi1979 (CC BY-SA 4.0) / Wikimedia Commons',stay:30,
 hours:'24시간 참배 가능 (부적 판매소 9:00~17:00쯤)',fee:'무료',
 rsv:{lv:0,t:'예약 필요 없음'},
 photo:{lv:1,t:'경내 촬영 OK. 본전 안쪽과 기도·결혼식 중인 사람은 찍지 않기.'},
 feat:'기온 거리 끝의 붉은 서쪽 누문과 등롱이 가득 달린 무대(부덴)가 상징. 밤엔 등롱에 불이 켜져요.',
 how:'게이한 기온시조역 도보 5분 · 시버스 기온 정류장 바로',
 kimono:'아주 좋음 — 기온에서 바로, 뒤쪽 마루야마 공원·초라쿠칸으로 이어져요.',
 tip:'초라쿠칸 가는 길에 지나가요. 미인 기원으로 유명한 우쓰쿠시고젠샤(미용수)도 경내에 있어요.'},
{id:'chouraku',n:'카페 초라쿠칸',jp:'長楽館',area:'히가시야마 · 마루야마 공원',lat:35.0034,lng:135.7812,ph:['a09.jpg'],stay:60,open:'11:00',last:'18:00',
 hours:'카페 11:00~18:30 (주문 마감 18:00쯤)',fee:'음료·디저트 1,500~3,000엔대',
 rsv:{lv:1,t:'일반 카페 이용은 예약 없이 줄 서서 입장. 애프터눈 티(영빈의 방)는 사전 예약제예요.'},
 photo:{lv:1,t:'내 자리와 음식은 OK. 다른 손님이 나오게 찍거나 방을 돌아다니며 찍는 건 제한될 수 있어 직원 안내를 따르세요.'},
 feat:'1909년 지어진 메이지 시대 서양식 저택(교토시 지정 문화재)을 그대로 쓰는 카페. 방마다 인테리어가 달라요.',
 how:'야사카 신사 뒤 마루야마 공원 안 · 기온에서 도보 10분',
 kimono:'좋음 — 의자 좌석이라 기모노로 앉기 편해요.',
 tip:'주말 오후엔 대기가 길어요. 오픈(11시) 직후나 평일이 편해요. PDF에 붙어 있던 와라비모찌 사진은 로쿠쥬안 메뉴와 같아 보여요.'},
{id:'kyocera',n:'교세라 미술관',jp:'京都市京セラ美術館',area:'오카자키',lat:35.0128,lng:135.7830,ph:['a11.jpg'],stay:40,open:'10:00',last:'17:30',
 hours:'10:00~18:00 (입장 17:30까지) · 월요일 휴관(공휴일이면 개관)',fee:'건물·로비·중앙홀은 무료 / 전시는 전시마다 유료',
 rsv:{lv:0,t:'건물 구경은 예약 필요 없음. 인기 기획전은 시간 지정 예매가 있을 수 있어요.'},
 photo:{lv:1,t:'건물·계단·중앙홀은 촬영 OK. 전시실 안은 전시마다 달라서 금지 표지를 확인하세요.'},
 feat:'1933년 개관, 일본에서 가장 오래된 공립 미술관 건물. 대리석 계단과 스테인드글라스 천장이 포토존이에요.',
 how:'지하철 도자이선 히가시야마역 도보 8분 · 시버스 5·46번 오카자키코엔 정류장 바로',
 kimono:'좋음 — 실내라 비 오거나 추울 때 좋아요.',
 tip:'11/23(월)은 공휴일이라 열고, 대신 다음 날 쉴 수 있어요. 바로 앞 헤이안 신궁 큰 도리이도 같이.'},
{id:'eikando',n:'에이칸도',jp:'永観堂 禅林寺',area:'오카자키 · 난젠지',lat:35.0144,lng:135.7953,ph:['b10.jpg'],stay:70,open:'9:00',last:'16:00',
 hours:'가을 특별 공개 기간 9:00~17:00 (접수 16:00까지) · 야간 라이트업 17:30~20:30쯤(낮 입장객은 일단 나갔다 다시 입장)',fee:'가을 낮 1,000엔 · 야간 700엔 안팎',
 rsv:{lv:0,t:'예약 필요 없음. 단풍철엔 매표 줄이 길어요.'},
 photo:{lv:1,t:'정원·연못·다보탑은 촬영 OK. 건물(당) 안과 불상(뒤돌아보는 아미타)은 촬영 금지, 삼각대·셀카봉 금지예요.'},
 feat:'“단풍의 에이칸도”라 불리는 교토 대표 단풍 절. 연못에 비친 단풍과 언덕 위 다보탑 전망이 유명해요.',
 how:'시버스 5번 난젠지·에이칸도미치 정류장 도보 5분 · 지하철 게아게역 도보 15분',
 kimono:'보통 — 경내가 넓고 건물에서 신발을 벗어요. 접수가 16시에 끝나니 15:30 전에는 도착하세요.',
 tip:'11월 하순이 절정이라 낮엔 매우 붐벼요. 아침 9시 오픈 직후가 제일 한산해요.'},
{id:'fushimi',n:'후시미 이나리 신사',jp:'伏見稲荷大社',area:'후시미',lat:34.9671,lng:135.7727,ph:['b02.jpg','b03.jpg','b04.jpg','b05.jpg','b06.jpg','b07.jpg','b08.jpg','b09.jpg'],stay:90,
 hours:'24시간 참배 가능 (부적 판매소 9:00~17:00쯤)',fee:'무료',
 rsv:{lv:0,t:'예약 필요 없음'},
 photo:{lv:1,t:'센본도리이 촬영은 자유. 본전 등 기도하는 건물 정면 안쪽은 촬영 금지 표지가 있어요. 삼각대는 사람 많을 때 자제하고, 길을 막고 오래 찍지 않기.'},
 feat:'주황색 도리이가 끝없이 이어지는 센본도리이. 안쪽으로 올라갈수록 이끼 낀 여우상, 작은 사당과 등롱이 나와요(저장한 사진들 분위기).',
 how:'JR 나라선 이나리역 바로 앞(교토역에서 5분) · 게이한 후시미이나리역 도보 5분',
 kimono:'좋음 — 단, 정상까지는 왕복 2시간 산길이에요. 기모노면 센본도리이~오쿠샤(왕복 30~40분)나 요쓰쓰지 전망대(왕복 약 90분)까지만 추천.',
 tip:'입구 쪽은 9시만 넘어도 사람으로 꽉 차요. 사람 없는 사진은 오쿠샤보다 더 위쪽에서 나와요. 일상복 날이면 아침 7~8시 도착이 최고.'},
{id:'komyoin',n:'고묘인 (光明院)',jp:'光明院 東福寺',area:'후시미 · 도후쿠지',lat:34.9737,lng:135.7722,ph:['a05.jpg'],stay:40,open:'7:00',last:'16:30',
 hours:'대략 7:00~해 질 무렵 (가을엔 시간·요금이 바뀔 수 있음)',fee:'지납금 500엔 안팎 (가을 특별 요금일 수 있음)',
 rsv:{lv:0,t:'예약 필요 없음'},
 photo:{lv:1,t:'정원·방에서 개인 촬영은 가능. 조용히 앉아 보는 곳이라 삼각대·본격 촬영(포즈 오래 잡기)은 금지/자제예요. 입구 안내문을 확인하세요.'},
 feat:'PDF에 주소(혼마치 15초메 809)로 적어둔 그 절. 도후쿠지의 작은 암자로 “무지개 이끼 절”이라 불려요. 다다미방에 앉아 이끼와 돌 정원(하신테이)을 조용히 봐요. 한국인이 적어요.',
 how:'JR·게이한 도후쿠지역 도보 10분 · 게이한 도바카이도역 도보 6분 · 후시미이나리에서 걸어서 15~20분',
 kimono:'좋음 — 다다미에 앉아 찍는 사진이 예뻐요. 신발 벗어요(양말/다비 챙기기).',
 tip:'후시미이나리와 묶기 좋아요. 바로 옆 도후쿠지 통천교는 단풍철에 엄청 붐비고 다리 위 촬영이 금지되는 기간이 있어요.'},
{id:'takase',n:'다카세강 (기야마치)',jp:'高瀬川 木屋町通',area:'시조·가와라마치',lat:35.0061,lng:135.7705,ph:['a06.jpg'],stay:30,
 hours:'24시간',fee:'무료',
 rsv:{lv:0,t:'예약 필요 없음'},
 photo:{lv:0,t:'자유롭게 촬영 가능. 강가 음식점 안쪽·손님은 찍지 않기.'},
 feat:'기야마치 길을 따라 흐르는 얕은 운하. 버드나무와 오래된 가게들이 줄지어 있어 산책하며 찍기 좋아요.',
 how:'한큐 교토가와라마치역 · 게이한 기온시조역에서 도보 3~5분',
 kimono:'좋음 — 평지 산책이라 편해요. 저녁엔 가게 불빛이 예뻐요.',
 tip:'시조~산조 사이가 가장 예쁜 구간. 저녁 먹으러 가는 길에 들르기 좋아요.'},
{id:'rokujuan',n:'로쿠쥬안 (교토 롯카쿠)',jp:'京都六角 麓寿庵',area:'가라스마 · 롯카쿠',lat:35.0074,lng:135.7562,ph:['b13.jpg'],stay:60,open:'8:00',last:'19:00',
 hours:'카페 8:00~ (주문 마감 19:00쯤, 요일별로 다름)',fee:'하나 와라비 세트 2,000엔 안팎',
 rsv:{lv:1,t:'TableCheck에서 온라인 예약 가능 — 주말·점심 이후는 예약 추천. 예약 없으면 대기할 수 있어요.'},
 photo:{lv:1,t:'내 자리·음식·정원 쪽은 OK. 다른 손님이 나오지 않게, 자리 이동하며 찍는 건 자제.'},
 feat:'1914년 지어진 등록유형문화재 저택(구보 가문 주택) 1층 카페. 식용 꽃이 들어간 투명한 와라비모찌 “하나 와라비”가 대표 메뉴. 아침 8시부터 오리 죽(가모가유)도 팔아요.',
 how:'지하철 가라스마오이케역 도보 6분 · 시조역/한큐 가라스마역 도보 8분',
 kimono:'좋음 — 다만 히가시야마에서는 거리가 있어요.',
 tip:'정원이 보이는 창가 자리는 예약할 때 요청해 보세요. 저장한 리뷰(별 1개)처럼 안내가 일본어 위주라는 후기가 있어요.'},
{id:'gosho',n:'교토 고쇼',jp:'京都御所',area:'교토 교엔',lat:35.0254,lng:135.7621,ph:['a03.jpg'],stay:50,open:'9:00',last:'15:20',
 hours:'10~2월 9:00~16:00 (입장 15:20까지) · 월요일 휴무(공휴일이면 다음 날)',fee:'무료',
 rsv:{lv:0,t:'예약 필요 없음 (당일 자유 입장). 입구(세이쇼몬)에서 가방 검사를 해요.'},
 photo:{lv:1,t:'촬영 OK. 삼각대·드론·셀카봉은 금지이고, 건물 안으로는 못 들어가요(밖에서 관람).'},
 feat:'옛 천황의 궁궐. 넓은 자갈 마당과 붉은 문, 소나무 정원. 저장한 영상처럼 사람이 적어 한적해요.',
 how:'지하철 가라스마선 이마데가와역 도보 5분 (세이쇼몬 입구)',
 kimono:'보통 — 자갈길이 길어 조리로 걷기 힘들어요. 일상복 날 추천.',
 tip:'11/23(월)은 공휴일이라 열고 11/24(화)에 쉴 가능성이 커요. 입장 마감이 15:20이라 일찍 가세요.'},
{id:'nonomiya',n:'노노미야 신사 · 기찻길 포토존',jp:'野宮神社',area:'아라시야마',lat:35.0178,lng:135.6743,ph:['a10.jpg'],stay:60,
 hours:'경내 자유 (부적 판매소 9:00~17:00)',fee:'무료',
 rsv:{lv:0,t:'예약 필요 없음'},
 photo:{lv:1,t:'촬영 OK. 바로 옆 기찻길 건널목은 선로 위에 멈춰 서서 찍으면 안 돼요(위험·금지). 차단기 밖에서 찍기. 대나무숲은 길을 막는 삼각대 금지.'},
 feat:'대나무숲 입구의 검은 도리이 신사(인연 맺기로 유명). 신사 바로 옆 JR 건널목이 기모노 뒷모습 포토존이에요.',
 how:'JR 사가아라시야마역 도보 10분 · 란덴 아라시야마역 도보 5분',
 kimono:'아주 좋음 — 대나무숲과 건널목이 기모노 사진 명소예요.',
 tip:'대나무숲은 9시 전에 가야 사람이 적어요. 건널목은 열차가 자주 지나가니 차단기가 내려오면 바로 비키기.'},
{id:'yusaitei',n:'유사이테이',jp:'嵐山 祐斎亭',area:'아라시야마',lat:35.0137,lng:135.6696,ph:['a07.jpg','a08.jpg'],stay:60,open:'10:00',last:'16:30',
 hours:'평소 10:00~17:00 (입장 16:30) 목요일 휴관 · 단풍철(작년 11/21~12/7)은 8:00~17:00, 목요일도 개관',fee:'평소 2,000엔 · 단풍철 3,000엔 (작년 기준)',
 rsv:{lv:2,t:'공식 사이트에서 날짜·시간 사전 예약 추천 — 단풍철엔 예약 없이는 못 들어갈 수 있어요. 가기 전 꼭 확인!'},
 photo:{lv:0,t:'촬영 OK — 둥근 창, 물거울 책상 등 사진 찍으라고 만든 곳이에요. 삼각대는 금지, 한 자리에서 오래 찍지 않기.'},
 feat:'800년 된 요정 건물을 쓰는 염색 작가의 갤러리. 둥근 창(마루마도)과 단풍이 비치는 책상·물거울이 유명해요.',
 how:'도게츠교에서 강변길을 따라 상류 쪽으로 도보 10분 (가메야마 공원 아래)',
 kimono:'아주 좋음 — 저장한 사진처럼 창가에 앉아 찍어요. 신발 벗어요.',
 tip:'요금·시간은 작년(2025) 기준이라 올해 것은 공식 사이트에서 확인하세요. 문의 075-881-2331'},
{id:'ruriko',n:'루리코인',jp:'瑠璃光院',area:'야세 (북쪽)',lat:35.0636,lng:135.7968,ph:['b14.jpg'],stay:60,open:'10:00',last:'16:30',
 hours:'가을 특별 공개 10:00~17:00 (접수 16:30) — 작년 기준',fee:'2,000엔 (작년 기준)',
 rsv:{lv:2,t:'단풍철은 사전 예약제예요(작년은 11/8~12/7 낮 관람 전부 예약제). 올해 일정도 예약 없이는 입장 불가일 가능성이 높으니 공식 사이트(rurikoin.komyoji.com)에서 꼭 확인! 올해 야간 특별 관람(11/20~12/6, 6,000엔)도 예약제.'},
 photo:{lv:1,t:'2층 책상 반사 사진 촬영 OK. 삼각대·셀카봉 금지, 책상에 물건 올리거나 기대지 않기. 사람이 많아 자리 양보하며 찍어요.'},
 feat:'2층 검은 책상에 단풍이 거울처럼 비치는 “리플렉션”으로 유명한 절. 봄·여름·가을에만 특별 공개해요.',
 how:'에이잔 전철 야세히에이잔구치역 도보 5분 (데마치야나기역에서 14분)',
 kimono:'비추 — 시내에서 편도 40분 이상이고 예약 시간이 정해져 있어요. 일상복 날로.',
 tip:'예약이 이미 찼다면 과감히 빼고, 같은 에이잔 전철의 기후네나 시내 일정으로 바꾸세요. 문의 075-781-4001'},
{id:'sanzenin',n:'산젠인',jp:'三千院',area:'오하라 (북쪽 멀리)',lat:35.1197,lng:135.8342,ph:['a01.jpg'],stay:70,open:'8:30',last:'16:30',
 hours:'11월 8:30~17:00',fee:'700엔',
 rsv:{lv:0,t:'예약 필요 없음'},
 photo:{lv:1,t:'이끼 정원·동자 지장은 촬영 OK. 건물 안과 불상은 촬영 금지예요.'},
 feat:'이끼 정원 사이사이 작은 동자 지장(와라베 지조)이 숨어 있는 절. 초록 이끼와 단풍이 같이 보여요.',
 how:'교토역에서 교토버스 17번 약 65분(또는 지하철 고쿠사이카이칸역 + 교토버스 19번 약 22분) → 오하라 정류장에서 오르막 도보 10~15분',
 kimono:'비추 — 편도 1시간 넘게 걸리고 오래 앉아 가야 해요. 일상복 날로.',
 tip:'오하라는 시내보다 2~3도 추워요. 버스가 단풍철 주말엔 막히니 아침 일찍 출발하세요.'},
{id:'hosenin',n:'호센인',jp:'宝泉院',area:'오하라 (북쪽 멀리)',lat:35.1209,lng:135.8338,ph:['a02.jpg'],stay:45,open:'9:00',last:'16:30',
 hours:'9:00~17:00 (접수 16:30)',fee:'900~1,000엔 (말차·과자 포함)',
 rsv:{lv:0,t:'예약 필요 없음. 가을 야간 라이트업은 따로 운영돼요.'},
 photo:{lv:1,t:'액자 정원 촬영 OK. 삼각대 금지, 다른 사람이 앉아 보는 자리를 가리지 않기.'},
 feat:'기둥과 문틀이 액자가 되는 “액자 정원”과 700년 된 오엽송. 붉은 융단에 앉아 말차를 마시며 봐요(저장한 사진 그 자리).',
 how:'산젠인에서 도보 5분',
 kimono:'비추 — 산젠인과 같은 이유. 일상복 날 산젠인과 세트로.',
 tip:'말차가 요금에 포함이에요. 천장의 “피 천장(지텐조)”도 유명해요.'},
{id:'kifune',n:'기후네 신사',jp:'貴船神社',area:'기부네 (북쪽 산속)',lat:35.1217,lng:135.7628,ph:['b01.jpg'],stay:70,
 hours:'6:00~20:00쯤 (단풍 등롱 기간엔 야간 연장) · 판매소 9:00~17:00',fee:'무료',
 rsv:{lv:0,t:'예약 필요 없음'},
 photo:{lv:0,t:'촬영 OK. 붉은 등롱 돌계단은 줄 서서 찍으니 빨리 찍고 비켜주기.'},
 feat:'붉은 등롱이 늘어선 돌계단과 물에 띄우면 글자가 나오는 물점(미즈우라 미쿠지). 한국인은 잘 모르는 숲속 신사예요.',
 how:'데마치야나기역에서 에이잔 전철 30분 → 기부네구치역에서 교토버스 33번 5분(또는 도보 30분) → 도보 5분',
 kimono:'비추 — 시내에서 편도 1시간 넘고 산길이에요. 일상복 날로.',
 tip:'11월엔 “모미지 등롱” 라이트업을 해요. 시내보다 훨씬 추우니 겉옷 필수. 본궁→오쿠미야까지 걸으면 왕복 30분 더.'},
{id:'kotoro',n:'Kotoro Coffee',jp:'Kotoro Coffee Kyoto',area:'위치 미확인',lat:null,lng:null,ph:['a04.jpg'],stay:50,
 hours:'확인 못 했어요 — 인스타/구글맵에서 확인',fee:'-',
 rsv:{lv:1,t:'정보를 찾지 못했어요. 가기 전 인스타그램에서 영업일·예약 여부를 확인하세요.'},
 photo:{lv:1,t:'확인 못 했어요. 카페라 보통 내 자리·음식은 OK지만 매장 안내를 따르세요.'},
 feat:'2024년 문을 연 교토의 자가 로스팅 카페(저장한 인스타 설명). 정원이 보이는 다다미 고택 카페예요.',
 how:'정확한 위치를 검색으로 찾지 못했어요. 구글맵에서 가게를 찾은 뒤 아래 “위치 정하기”로 지도에 찍어주세요.',
 kimono:'위치에 따라 달라요.',
 tip:'위치를 정하면 동선과 이동 시간에 자동으로 들어가요.'}
];
const PMAP={};PLACES.forEach(p=>PMAP[p.id]=p);

const AREAS={
 kiyomizu:{n:'기요미즈·산넨자카',lat:34.9975,lng:135.7792},
 gion:{n:'기온',lat:35.0037,lng:135.7745},
 station:{n:'교토역',lat:34.9858,lng:135.7588},
 arashiyama:{n:'아라시야마',lat:35.0152,lng:135.6778},
 fushimi:{n:'후시미이나리',lat:34.9680,lng:135.7712},
 downtown:{n:'시조·가와라마치',lat:35.0040,lng:135.7690},
 osaka:{n:'오사카 숙소 (기타카가야)',lat:34.6237,lng:135.4778}
};
const HOME_AREAS=['osaka','station','downtown','gion','kiyomizu','arashiyama'];

/* 이동 시간 어림: 구역 중심과 구역 사이 대중교통(문에서 문까지, 대기 포함) */
const CL={ST:[34.9858,135.7588,1.2],GI:[34.9995,135.7790,1.0],OK:[35.0135,135.7890,1.0],DT:[35.0055,135.7650,1.0],GO:[35.0254,135.7621,1.0],FU:[34.9705,135.7725,1.0],AR:[35.0150,135.6740,1.5],YA:[35.0636,135.7968,1.2],OH:[35.1200,135.8340,1.5],KI:[35.1217,135.7628,2.5],OS:[34.6237,135.4778,2.0]};
const TR={
'OS|ST':[70,'요쓰바시선 기타카가야→니시우메다 17분, JR 오사카→교토 신쾌속 29분'],
'OS|DT':[80,'요쓰바시선→니시우메다, 한큐 오사카우메다→교토가와라마치 특급 약 43분'],
'OS|GI':[85,'요쓰바시선 히고바시에서 내려 게이한 요도야바시→기온시조 특급 약 50분'],
'OS|FU':[85,'게이한 요도야바시→단바바시 환승→후시미이나리 (또는 JR 교토 경유 나라선)'],
'OS|OK':[100,'게이한 요도야바시→산조 + 지하철 도자이선 히가시야마'],
'OS|GO':[95,'JR 오사카→교토 + 지하철 가라스마선 이마데가와'],
'OS|AR':[100,'한큐 오사카우메다→가쓰라 환승→아라시야마'],
'OS|YA':[115,'게이한 요도야바시→데마치야나기 특급 약 55분 + 에이잔 전철 14분'],
'OS|OH':[140,'게이한→데마치야나기 + 교토버스 16·17번 (또는 JR 교토 + 교토버스 17번)'],
'OS|KI':[135,'게이한 요도야바시→데마치야나기 + 에이잔 전철 30분 + 버스 33번'],
'ST|GI':[25,'시버스 206·86번(기요미즈미치·기온) 15~20분 + 도보'],
'ST|OK':[35,'지하철 가라스마선→도자이선 히가시야마역 + 도보, 또는 시버스 5·86번'],
'ST|DT':[15,'지하철 가라스마선 교토→시조 4분 + 도보'],
'ST|GO':[20,'지하철 가라스마선 교토→이마데가와 10분 + 도보 5분'],
'ST|FU':[15,'JR 나라선 교토→이나리 5분 (도후쿠지는 한 정거장)'],
'ST|AR':[35,'JR 사가노선 교토→사가아라시야마 17분 + 도보 10~15분'],
'ST|YA':[55,'JR 나라선→도후쿠지, 게이한→데마치야나기, 에이잔 전철→야세히에이잔구치'],
'ST|OH':[70,'교토버스 17번 오하라행 약 65분 (또는 지하철 고쿠사이카이칸 + 교토버스 19번)'],
'ST|KI':[80,'게이한 데마치야나기→에이잔 전철 기부네구치 30분→교토버스 33번'],
'GI|OK':[25,'시버스 86·206번 또는 지하철 도자이선 한 정거장 (걸으면 20~25분)'],
'GI|DT':[15,'시조 대교를 건너 도보 또는 시버스'],
'GI|GO':[30,'게이한 기온시조→진구마루타마치 + 도보 15분, 또는 시버스 201·202번'],
'GI|FU':[25,'게이한 본선 기온시조·기요미즈고조→후시미이나리 7~9분 + 도보 (도후쿠지·도바카이도도 같은 노선)'],
'GI|AR':[55,'한큐 교토가와라마치→가쓰라 환승→아라시야마, 또는 JR·란덴'],
'GI|YA':[40,'게이한 기온시조→데마치야나기 6분, 에이잔 전철→야세히에이잔구치 14분'],
'GI|OH':[65,'게이한→데마치야나기 + 교토버스 16·17번 약 35분'],
'GI|KI':[65,'게이한→데마치야나기, 에이잔 전철 기부네구치 30분, 버스 33번'],
'OK|DT':[25,'지하철 도자이선 히가시야마→산조·시야쿠쇼마에 + 도보, 또는 시버스 5번'],
'OK|GO':[30,'시버스 93·204번(마루타마치도리) 또는 지하철 도자이→가라스마선 환승'],
'OK|FU':[40,'지하철 히가시야마→산조게이한, 게이한→후시미이나리'],
'OK|AR':[55,'지하철 도자이선→우즈마사텐진가와, 란덴 환승 (또는 시버스 93번)'],
'OK|YA':[40,'시버스로 데마치야나기 + 에이잔 전철 14분'],
'OK|OH':[60,'지하철→고쿠사이카이칸 + 교토버스 19번'],
'OK|KI':[70,'데마치야나기 경유 에이잔 전철 + 버스 33번'],
'DT|GO':[15,'지하철 가라스마선 시조→마루타마치·이마데가와 3~6분 + 도보'],
'DT|FU':[25,'게이한 기온시조→후시미이나리, 또는 지하철 + JR 나라선'],
'DT|AR':[40,'한큐 교토가와라마치·가라스마→가쓰라 환승→아라시야마 약 20분 + 도보 15분'],
'DT|YA':[40,'게이한 기온시조→데마치야나기, 에이잔 전철 14분'],
'DT|OH':[60,'시조가와라마치·가라스마에서 교토버스 17번 약 50분'],
'DT|KI':[65,'게이한→데마치야나기, 에이잔 전철 30분, 버스 33번'],
'GO|FU':[35,'지하철 이마데가와→교토 + JR 나라선'],
'GO|AR':[45,'지하철→니조, JR 사가노선→사가아라시야마 (또는 시버스 93번)'],
'GO|YA':[35,'데마치야나기까지 도보·버스 + 에이잔 전철 14분'],
'GO|OH':[50,'지하철 이마데가와→고쿠사이카이칸 10분 + 교토버스 19번 22분'],
'GO|KI':[55,'데마치야나기 + 에이잔 전철 30분 + 버스 33번'],
'FU|AR':[50,'JR 나라선→교토, JR 사가노선 환승'],
'FU|YA':[50,'게이한→데마치야나기 약 20분, 에이잔 전철 14분'],
'FU|OH':[75,'게이한→데마치야나기 + 교토버스 16·17번'],
'FU|KI':[75,'게이한→데마치야나기 + 에이잔 전철 30분 + 버스'],
'AR|YA':[75,'JR·지하철로 시내 → 데마치야나기 → 에이잔 전철'],
'AR|OH':[90,'JR·지하철 → 고쿠사이카이칸 → 교토버스 19번'],
'AR|KI':[90,'JR·지하철 → 데마치야나기 → 에이잔 전철 + 버스'],
'YA|OH':[25,'교토버스 17·19번 야세에키마에↔오하라 약 15분 + 대기'],
'YA|KI':[50,'에이잔 전철 야세히에이잔구치→다카라가이케 환승→기부네구치 + 버스 33번'],
'OH|KI':[80,'직행 없음 — 교토버스 19번→고쿠사이카이칸→지하철·에이잔 전철 환승']
};
/* 추천 동선: [장소, 머무는 분] · 'lunch' = 점심 */
const OPTS={kimono:[
 {id:'k1',n:'히가시야마 정석',fit:['kiyomizu','gion'],d:'골목 → 양관 카페 → 미술관 → 단풍 절. 거의 걸어서 다녀요.',stops:[['sannen',70],['lunch',60],['chouraku',50],['kyocera',40],['eikando',70]]},
 {id:'k2',n:'토리이 + 이끼 정원 + 산넨자카',fit:['kiyomizu','gion','station','fushimi'],d:'오전에 붉은 토리이와 고요한 절, 오후에 골목 사진. 게이한 전철 한 노선으로 이동.',stops:[['fushimi',90],['komyoin',40],['lunch',60],['sannen',70],['chouraku',50]]},
 {id:'k3',n:'아라시야마 한 바퀴',fit:['arashiyama'],d:'대나무숲·기찻길 → 유사이테이 둥근 창. 이동이 적어 여유로워요(유사이테이 예약 확인).',stops:[['nonomiya',60],['yusaitei',60],['lunch',60],['free:도게츠교·강변 산책',45]]},
 {id:'k4',n:'기온·강변 느긋 코스',fit:['gion','kiyomizu'],d:'강변 산책 → 골목 → 카페 → 미술관. 많이 안 걷고 카페에서 쉬는 코스.',stops:[['takase',30],['sannen',80],['lunch',60],['chouraku',60],['kyocera',40]]},
 {id:'k5',n:'욕심 코스 (토리이+골목+단풍)',fit:['kiyomizu','gion','station'],d:'후시미이나리, 산넨자카, 에이칸도까지 하루에. 빠듯해요.',stops:[['fushimi',80],['lunch',50],['sannen',60],['kyocera',30],['eikando',60]]}
],casual:[
 {id:'c1',n:'오하라 + 루리코인',d:'북쪽 이끼 절 두 곳과 리플렉션 책상. 루리코인 예약이 있어야 해요.',stops:[['sanzenin',70],['hosenin',45],['lunch',60],['ruriko',60],['takase',30]]},
 {id:'c2',n:'기후네 + 루리코인 + 고쇼',d:'에이잔 전철로 숲속 신사와 루리코인, 돌아와서 궁궐과 와라비모찌.',stops:[['kifune',70],['lunch',60],['ruriko',60],['gosho',45],['rokujuan',50]]},
 {id:'c3',n:'아라시야마 + 시내',d:'기모노를 히가시야마에서 입는 날의 짝. 대나무숲·유사이테이 후 고쇼와 카페.',stops:[['nonomiya',50],['yusaitei',60],['lunch',60],['gosho',45],['rokujuan',50],['takase',30]]},
 {id:'c4',n:'후시미 + 히가시야마',d:'기모노를 아라시야마에서 입는 날의 짝. 아침 일찍 토리이부터.',stops:[['fushimi',100],['komyoin',40],['lunch',60],['sannen',60],['chouraku',50],['eikando',70]]},
 {id:'c5',n:'시내 느긋 코스',d:'멀리 안 가요. 아침 와라비모찌 → 궁궐 → 미술관 → 단풍 → 강변.',stops:[['rokujuan',60],['gosho',50],['lunch',60],['kyocera',45],['eikando',70],['takase',30]]}
]};

const DAYS={kimono:{n:'기모노 데이',base:'숙소 출발',back:'숙소로'},casual:{n:'일상복 데이',base:'숙소 출발',back:'숙소로'}};
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Math.random().toString(36).slice(2,9);
const toMin=t=>{const m=/^(\d{1,2}):(\d{2})$/.exec(t||'');return m?(+m[1])*60+(+m[2]):null};
const fmt=m=>{m=Math.round(m);const h=Math.floor(m/60)%24,x=m%60;return h+':'+(x<10?'0':'')+x};
const dur=m=>{m=Math.round(m);const h=Math.floor(m/60),x=m%60;return (h?h+'시간 ':'')+(x||!h?x+'분':'')};
function hav(a,b){const R=6371,r=Math.PI/180,dl=(b.lat-a.lat)*r,dg=(b.lng-a.lng)*r;const s=Math.sin(dl/2)**2+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin(dg/2)**2;return 2*R*Math.asin(Math.sqrt(s))}
function cluster(p){let best=null,bd=1e9;for(const k in CL){const d=hav(p,{lat:CL[k][0],lng:CL[k][1]});if(d<=CL[k][2]&&d<bd){bd=d;best=k}}return best}

function buildStops(opt){return opt.stops.map(([p,stay])=>p==='lunch'?{k:uid(),p:'free',name:'점심',stay,mode:'auto',min:null}:p.startsWith('free:')?{k:uid(),p:'free',name:p.slice(5),stay,mode:'auto',min:null}:{k:uid(),p,stay,mode:'auto',min:null})}
function defaults(){return {v:3,
 days:{kimono:{start:'08:00',end:'',base:{area:'osaka',loc:null,stay:0},opt:'k1',stops:buildStops(OPTS.kimono[0])},
       casual:{start:'08:00',end:'',base:{area:'osaka',loc:null,stay:0},opt:'c2',stops:buildStops(OPTS.casual[1])}},
 custom:{},memo:{},loc:{}}}
function normalize(d){const s=defaults();if(!d||typeof d!=='object')return s;
 ['kimono','casual'].forEach(k=>{const x=d.days&&d.days[k];if(x){s.days[k]=Object.assign(s.days[k],x);s.days[k].base=Object.assign({area:'osaka',loc:null,stay:0},x.base||{});if(k==='casual'&&!(d.v>=2)&&s.days[k].base.area==='station'&&!s.days[k].base.loc)s.days[k].base.area='osaka';s.days[k].stops=Array.isArray(x.stops)?x.stops.filter(t=>t&&t.p):[]}});
 /* v3: 기모노를 사서 입어요 — 대여점·대여/반납 시간을 없애고 숙소에서 출발해요. 대여 전 일정은 맨 앞으로 옮겨요. */
 if(!(d.v>=3)&&d.days&&d.days.kimono){const K=s.days.kimono,pre=Array.isArray(K.pre)?K.pre.filter(t=>t&&t.p):[];K.stops=pre.concat(K.stops);K.stops.forEach((t,i)=>{if(i<=pre.length){t.min=null;t.mode='auto'}});
  K.base=Object.assign({},s.days.casual.base,{stay:0});K.end='';K.backMin=null;K.backMode=null;['pre','buffer','rentMin','rentMode'].forEach(x=>{delete K[x]})}
 s.custom=d.custom||{};s.memo=d.memo||{};s.loc=d.loc||{};return s}

let ST=defaults(),api={},root=null,day='kimono',map=null,layer=null,pick=null,saveT=null,db=null,lastSaved='',fitNext=true,poolOpen=false;
try{const c=localStorage.getItem('kyRoute');if(c)ST=normalize(JSON.parse(c));const dd=localStorage.getItem('kyDay');if(dd==='casual')day='casual'}catch(e){}

const place=id=>PMAP[id]||(ST.custom[id]?Object.assign({id,custom:true,ph:[],rsv:{lv:0,t:''},photo:{lv:0,t:''}},ST.custom[id]):null);
function locOf(id){const o=ST.loc[id];if(o&&o.lat!=null)return o;const p=place(id);return p&&p.lat!=null?{lat:p.lat,lng:p.lng}:null}
function baseLoc(k){const b=ST.days[k].base;if(b.loc&&b.loc.lat!=null)return b.loc;const a=AREAS[b.area]||AREAS.station;return {lat:a.lat,lng:a.lng}}
const stopName=s=>s.p==='free'?(s.name||'자유 일정'):((place(s.p)||{}).n||'지운 장소');
const thumb=p=>p.custom?(p.img&&api.img?api.img(p.img):''):(p.ph&&p.ph[0]?PH+p.ph[0]:'');

function leg(a,b,kimono,mode,min){
 const d=hav(a,b),wm=Math.max(2,Math.round(d*1.3/(kimono?3.4:4.3)*60));
 const ca=cluster(a),cb=cluster(b);let tm,how;
 if(ca&&cb&&ca!==cb){const t=TR[ca+'|'+cb]||TR[cb+'|'+ca];tm=t[0];how=t[1]}
 else if(ca&&cb){tm=Math.max(10,Math.round(8+d*1.3/15*60));how='가까운 거리 — 버스·전철 한두 정거장 또는 택시'}
 else{tm=Math.round(15+d*1.3/18*60);how='어림값이에요 — 길찾기로 확인'}
 let m=mode;if(m!=='walk'&&m!=='transit')m=wm<=(kimono?18:25)?'walk':'transit';
 const auto=m==='walk'?wm:tm;
 return {mode:m,min:min!=null?min:auto,auto,manual:min!=null,dist:d,how:m==='walk'?'':how,wm,tm}}

/* 하루 계산: 시간표와 경고 */
function calc(k,state){const S=state||ST,D=S.days[k],kim=k==='kimono';
 let t=toMin(D.start);if(t==null)t=540;const rows=[];let prev=baseLoc(k),walk=0,trans=0,stay=0;
 const t0=t;t+=D.base.stay||0;
 D.stops.forEach((s,i)=>{const r={s,i,leg:null,warn:[]};const l=s.p==='free'?null:(S===ST?locOf(s.p):(PMAP[s.p]&&PMAP[s.p].lat!=null?PMAP[s.p]:null));
  if(l){r.leg=leg(prev,l,kim,s.mode,s.min);t+=r.leg.min;(r.leg.mode==='walk'?walk+=r.leg.min:trans+=r.leg.min);r.from=prev;r.to=l;prev=l}
  r.arr=t;t+=s.stay||0;r.dep=t;stay+=s.stay||0;
  const p=PMAP[s.p];if(p){const o=toMin(p.open),c=toMin(p.last);if(o!=null&&r.arr<o)r.warn.push('문 여는 시간('+p.open+') 전에 도착해요');if(c!=null&&r.arr>c)r.warn.push('입장 마감('+p.last+') 뒤에 도착해요');}
  if(s.p!=='free'&&!l)r.warn.push('위치가 없어 이동 시간에서 빠졌어요');
  rows.push(r)});
 const bl=baseLoc(k);const back=leg(prev,bl,kim,D.backMode,D.backMin!=null?D.backMin:null);const hasMove=D.stops.some(s=>s.p!=='free');
 if(hasMove){t+=back.min;(back.mode==='walk'?walk+=back.min:trans+=back.min)}
 const end=toMin(D.end);return {rows,start:t0,depart:t0+(D.base.stay||0),finish:t,back:hasMove?back:null,backFrom:prev,walk,trans,stay,end,over:end!=null?t-end:null}}

/* ---------- 저장 ---------- */
function changed(){try{localStorage.setItem('kyRoute',JSON.stringify(ST))}catch(e){}
 if(!db)return;clearTimeout(saveT);saveT=setTimeout(async()=>{saveT=null;const body=JSON.parse(JSON.stringify(ST));body.updatedAt=Date.now();lastSaved=JSON.stringify(ST);
  try{await db.doc('kyoto/main').set(body)}catch(e){api.toast&&api.toast('동선을 저장하지 못했어요. 인터넷 연결을 확인해 주세요.')}},700)}
function connect(d){db=d;if(!db)return;
 db.doc('kyoto/main').onSnapshot(snap=>{if(!snap.exists||saveT)return;const n=normalize(snap.data());const j=JSON.stringify(n);if(j===JSON.stringify(ST))return;ST=n;try{localStorage.setItem('kyRoute',j)}catch(e){}render()},()=>{})}

/* ---------- 화면 ---------- */
const CSS=`
.ky-sec{margin-top:26px}
.ky-h{display:flex;align-items:baseline;justify-content:space-between;gap:10px;margin-bottom:10px;flex-wrap:wrap}
.ky-h h3{font-size:19px}.ky-h span{font-size:13px;color:var(--ink-2)}
.ky-days{display:grid;grid-template-columns:1fr 1fr;gap:8px;max-width:520px;margin:0 auto}
.ky-dbtn{background:var(--sheet);border:1px solid var(--frame);padding:10px 8px;display:grid;gap:2px;text-align:center;line-height:1.3}
.ky-dbtn b{font-family:var(--f-display);font-weight:400;font-size:17px}.ky-dbtn small{font-size:12px;color:var(--ink-2)}
.ky-dbtn[aria-pressed="true"]{background:var(--shu-soft);border-color:var(--shu)}
.ky-row{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.ky-set{background:var(--sheet);border:1px solid var(--frame);padding:12px 14px;display:grid;gap:10px;font-size:14px}
.ky-set label{font-size:13px;color:var(--ink-2)}
.ky-set input[type=time]{font:inherit;border:1px solid var(--line);background:#fff;padding:2px 6px;border-radius:6px;color:var(--ink)}
.ky-opts{display:flex;gap:12px;overflow-x:auto;padding:4px 2px 12px;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch}
.ky-opt{flex:0 0 min(78vw,290px);scroll-snap-align:start;background:var(--sheet);border:1px solid var(--frame);padding:12px;display:grid;gap:8px;align-content:start;box-shadow:var(--shadow)}
.ky-opt.on{border-color:var(--shu);background:#FBF5F7}
.ky-opt h4{font-size:17px}.ky-opt p{margin:0;font-size:13px;color:var(--ink-2);line-height:1.5}
.ky-opt .ky-strip{display:flex;gap:4px}.ky-opt .ky-strip img{width:44px;height:44px;object-fit:cover;border:1px solid var(--line)}
.ky-opt ol{margin:0;padding-left:18px;font-size:13px;line-height:1.6}
.ky-tag{display:inline-block;font-size:11px;padding:0 8px;border-radius:99px;border:1px solid var(--line);color:var(--ink-2);background:var(--sheet);white-space:nowrap}
.ky-tag.good{border-color:var(--matcha);color:var(--matcha);background:var(--matcha-soft)}
.ky-tag.warn{border-color:#C2703F;color:#A8552A;background:#FBEDE3}
.ky-tag.rsv{border-color:var(--shu);color:var(--shu);background:var(--shu-soft)}
.ky-map{height:340px;border:1px solid var(--frame);background:var(--ai-soft);z-index:0;position:relative}
@media (min-width:900px){.ky-map{height:460px}}
.ky-pickbar{background:var(--ink);color:var(--sheet);padding:8px 12px;font-size:14px;display:flex;justify-content:space-between;align-items:center;gap:8px}
.ky-pickbar button{background:none;border:1px solid var(--sheet);color:var(--sheet);border-radius:99px;padding:1px 10px;font-size:13px}
.ky-pin{width:26px;height:26px;border-radius:50%;background:var(--shu);color:#fff;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4);display:grid;place-items:center;font:700 13px/1 system-ui,sans-serif}
.ky-pin.base{background:var(--ink);border-radius:6px}.ky-pin.pool{width:14px;height:14px;background:#fff;border:3px solid var(--ai)}
.ky-pop{width:170px;font-family:var(--f-body);display:grid;gap:6px}.ky-pop img{width:100%;height:110px;object-fit:cover;display:block}.ky-pop b{font-size:14px}
.ky-pop button{font:inherit;font-size:13px;border:1px solid var(--frame);background:var(--sheet);border-radius:99px;padding:3px 10px;color:var(--ink)}
.ky-sum{display:grid;grid-template-columns:repeat(4,1fr);background:var(--sheet);border:1px solid var(--frame);margin-top:10px}
.ky-sum>div{padding:8px 6px;text-align:center;border-right:1px solid var(--line);display:grid;gap:0}
.ky-sum>div:last-child{border-right:0}.ky-sum small{font-size:11px;color:var(--ink-2)}.ky-sum b{font-family:var(--f-num);font-size:19px;font-weight:400}
.ky-alert{margin-top:8px;padding:8px 12px;font-size:14px;border:1px solid #C2703F;background:#FBEDE3;color:#8A4420}
.ky-alert.ok{border-color:var(--matcha);background:var(--matcha-soft);color:var(--ink)}
.ky-list{display:grid;gap:0;margin-top:12px}
.ky-stop{display:grid;grid-template-columns:76px 1fr;gap:12px;background:var(--sheet);border:1px solid var(--frame);padding:10px;align-items:start}
.ky-stop.free{grid-template-columns:1fr;background:#F7F5F9}
.ky-stop.base{grid-template-columns:1fr;background:var(--ai-soft)}
.ky-th{padding:0;border:1px solid var(--line);background:var(--ai-soft);width:76px;height:96px;display:block;overflow:hidden;position:relative}
.ky-th img{width:100%;height:100%;object-fit:cover;display:block}
.ky-th i{position:absolute;left:3px;top:3px;font-style:normal}
.ky-time{font-family:var(--f-num);font-size:15px;color:var(--shu)}
.ky-name{font-family:var(--f-display);font-size:17px;line-height:1.35}
.ky-name button{background:none;border:0;padding:0;text-align:left;font:inherit;color:inherit;text-decoration:underline;text-decoration-color:var(--frame);text-underline-offset:4px}
.ky-bad{display:flex;flex-wrap:wrap;gap:4px;margin:4px 0}
.ky-ctl{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:6px;font-size:13px;color:var(--ink-2)}
.ky-ib{min-width:32px;height:32px;border:1px solid var(--frame);background:var(--sheet);border-radius:99px;font-size:14px;padding:0 9px;color:var(--ink)}
.ky-ib:disabled{opacity:.3}
.ky-step{display:inline-flex;align-items:center;gap:4px}.ky-step b{font-family:var(--f-num);font-weight:400;font-size:16px;color:var(--ink);min-width:44px;text-align:center}
.ky-leg{margin-left:24px;border-left:2px dotted var(--frame);padding:8px 0 8px 14px;font-size:13px;color:var(--ink-2);display:grid;gap:4px}
.ky-leg.walk{border-left-style:solid;border-left-color:var(--matcha)}
.ky-leg .ky-row b{font-family:var(--f-num);font-weight:400;font-size:17px;color:var(--ink)}
.ky-seg{display:inline-flex;border:1px solid var(--frame);border-radius:99px;overflow:hidden}
.ky-seg button{border:0;background:var(--sheet);padding:2px 10px;font-size:12px;color:var(--ink-2)}
.ky-seg button[aria-pressed="true"]{background:var(--ink);color:var(--sheet)}
.ky-leg a,.ky-lk{font-size:13px}
.ky-pool{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
.ky-card{background:var(--sheet);border:1px solid var(--frame);display:grid;gap:6px;padding:6px 6px 8px;align-content:start}
.ky-th:empty,.ky-card .ky-ph{padding:0;border:0;background:var(--ai-soft);aspect-ratio:4/5;overflow:hidden;display:block;width:100%}
.ky-card img{width:100%;height:100%;object-fit:cover;display:block}
.ky-card b{font-family:var(--f-display);font-weight:400;font-size:15px;line-height:1.3}
.ky-card small{font-size:12px;color:var(--ink-2)}
.ky-info{display:grid;gap:8px}
.ky-info details{background:var(--sheet);border:1px solid var(--frame);padding:8px 12px}
.ky-info summary{cursor:pointer;font-family:var(--f-display);font-size:16px}
.ky-info ul{margin:8px 0 2px;padding-left:18px;font-size:14px;display:grid;gap:6px}
.ky-gal{display:flex;gap:8px;overflow-x:auto;scroll-snap-type:x mandatory;margin-inline:-4px;padding:0 4px 4px}
.ky-gal img{height:300px;max-width:86%;object-fit:cover;scroll-snap-align:center;border:1px solid var(--line);flex:0 0 auto}
.ky-dl{display:grid;gap:10px;margin:0;font-size:14px}
.ky-dl dt{font-size:12px;color:var(--shu);font-family:var(--f-it);font-style:italic}.ky-dl dd{margin:0}
.ky-sheet textarea,.ky-sheet input[type=text],.ky-sheet input[type=number]{width:100%;font:inherit;border:1px solid var(--line);background:#fff;padding:8px 10px;border-radius:8px;color:var(--ink)}
.ky-res{display:grid;gap:4px}.ky-res button{text-align:left;border:1px solid var(--line);background:var(--sheet);padding:6px 10px;font-size:13px;border-radius:8px}
.ky-note{font-size:12px;color:var(--ink-2);margin-top:8px}
@media (max-width:420px){.ky-sum b{font-size:16px}.ky-stop{grid-template-columns:64px 1fr;gap:10px}.ky-th{width:64px;height:84px}}
`;

function init(el,a){root=el;api=a||{};
 const st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
 root.innerHTML='<div class="panel-head"><div><div class="label">Kyoto route</div><h2>교토 이틀 동선</h2></div><p>가고 싶은 곳 18곳을 지도와 사진으로 모았어요. 추천 동선을 고른 뒤 순서·머무는 시간·장소를 마음대로 고치면 둘이 같이 저장돼요.</p></div>'+
  '<div class="ky-days" id="kyDays"></div>'+
  '<div class="ky-sec" id="kySet"></div>'+
  '<div class="ky-sec"><div class="ky-h"><h3>추천 동선 고르기</h3><span>옆으로 넘겨 보세요</span></div><div class="ky-opts" id="kyOpts"></div></div>'+
  '<div class="ky-sec"><div class="ky-h"><h3 id="kyMapT">지도</h3><span>번호 = 가는 순서 · 흰 점 = 아직 안 넣은 곳</span></div><div id="kyPick"></div><div class="ky-map" id="kyMap"></div><div id="kySum"></div></div>'+
  '<div class="ky-sec"><div class="ky-h"><h3>시간표</h3><span>이동 시간은 어림값이에요</span></div><div class="ky-list" id="kyList"></div></div>'+
  '<div class="ky-sec" id="kyPool"></div>'+
  '<div class="ky-sec" id="kyInfo"></div>';
 root.addEventListener('click',onClick);root.addEventListener('change',onChange);
 render();
 if('IntersectionObserver' in window)new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting))ensureMap()}).observe(root.querySelector('#kyMap'));else ensureMap();
}

function render(){if(!root)return;renderDays();renderSet();renderOpts();renderList();renderPool();renderInfo();drawMap()}
const $=s=>root.querySelector(s);

function renderDays(){$('#kyDays').innerHTML=['kimono','casual'].map(k=>{const c=calc(k);return '<button class="ky-dbtn" data-ky="day" data-v="'+k+'" aria-pressed="'+(day===k)+'"><b>'+DAYS[k].n+'</b><small>'+ST.days[k].stops.filter(s=>s.p!=='free').length+'곳 · '+fmt(c.start)+'~'+fmt(c.finish)+'</small></button>'}).join('')}

function renderSet(){const D=ST.days[day];
 $('#kySet').innerHTML='<div class="ky-set"><div><label>숙소(출발) 동네</label><div class="ky-row" style="margin-top:4px">'+
  HOME_AREAS.map(a=>'<button class="chip" data-ky="area" data-v="'+a+'" aria-pressed="'+(!D.base.loc&&D.base.area===a)+'">'+AREAS[a].n+'</button>').join('')+
  '<button class="chip" data-ky="pickBase" aria-pressed="'+(!!D.base.loc)+'">'+(D.base.loc?'지도에 찍은 위치 ✓':'지도에서 직접 찍기')+'</button></div></div>'+
  '<div class="ky-row"><label>출발 <input type="time" data-ky="start" value="'+esc(D.start)+'"></label>'+
  '<label>돌아올 시간(선택) <input type="time" data-ky="end" value="'+esc(D.end||'')+'"></label></div></div>'}

function optSim(k,o){const tmp={days:{}};tmp.days[k]=Object.assign({},ST.days[k],{stops:buildStops(o),backMin:null,backMode:null});return calc(k,tmp)}
function renderOpts(){const D=ST.days[day],opts=OPTS[day];
 $('#kyOpts').innerHTML=opts.map(o=>{const c=optSim(day,o);const names=o.stops.map(([p])=>p==='lunch'?'점심':p.startsWith('free:')?p.slice(5):PMAP[p].n);
  const imgs=o.stops.filter(([p])=>PMAP[p]).slice(0,5).map(([p])=>'<img alt="" loading="lazy" src="'+PH+PMAP[p].ph[0]+'">').join('');
  const needR=o.stops.filter(([p])=>PMAP[p]&&PMAP[p].rsv.lv===2).map(([p])=>PMAP[p].n);
  const late=c.over!=null&&c.over>0;
  return '<article class="ky-opt'+(D.opt===o.id?' on':'')+'"><div class="ky-strip">'+imgs+'</div><h4>'+esc(o.n)+'</h4>'+
   '<div class="ky-bad">'+(late?'<span class="ky-tag warn">예정 '+c.over+'분 초과</span>':'')+(needR.length?'<span class="ky-tag rsv">예약 확인: '+esc(needR.join(', '))+'</span>':'')+'</div>'+
   '<p>'+esc(o.d)+'</p><ol>'+names.map(n=>'<li>'+esc(n)+'</li>').join('')+'</ol>'+
   '<p class="num" style="color:var(--ink)">'+fmt(c.depart)+' 출발 → '+fmt(c.finish)+' 도착 · 이동 '+dur(c.walk+c.trans)+'</p>'+
   '<button class="btn'+(D.opt===o.id?' ghost':'')+'" data-ky="useOpt" data-v="'+o.id+'">'+(D.opt===o.id?'지금 이 동선이에요 (처음대로 되돌리기)':'이 동선으로 시작')+'</button></article>'}).join('')}

function gmDir(a,b,mode){return 'https://www.google.com/maps/dir/?api=1&origin='+a.lat+','+a.lng+'&destination='+b.lat+','+b.lng+'&travelmode='+(mode==='walk'?'walking':'transit')}
function legHTML(l,from,to,key,ln){if(!l)return '';const LN=ln?' data-l="'+ln+'"':'';
 return '<div class="ky-leg '+l.mode+'"><div class="ky-row"><span class="ky-seg"><button data-ky="mode"'+LN+' data-i="'+key+'" data-v="walk" aria-pressed="'+(l.mode==='walk')+'">도보</button><button data-ky="mode"'+LN+' data-i="'+key+'" data-v="transit" aria-pressed="'+(l.mode==='transit')+'">버스·전철</button></span>'+
  '<b>'+dur(l.min)+'</b><span>'+(l.dist<1?Math.round(l.dist*100)*10+'m':l.dist.toFixed(1)+'km')+(l.manual?' · 직접 입력':'')+'</span></div>'+
  (l.how?'<div>'+esc(l.how)+'</div>':'')+
  '<div class="ky-row"><button class="mini" data-ky="legMin"'+LN+' data-i="'+key+'">시간 고치기</button><a target="_blank" rel="noopener" href="'+gmDir(from,to,l.mode)+'">구글맵 길찾기 ↗</a>'+
  (l.mode==='walk'?'<span>버스·전철이면 약 '+l.tm+'분</span>':(l.wm<=90?'<span>걸으면 약 '+dur(l.wm)+'</span>':''))+'</div></div>'}

function ctlHTML(s,i,n,ln,kim){const L=' data-l="'+ln+'" data-i="'+i+'"';
 return '<div class="ky-ctl"><span class="ky-step">머무는 시간 <button class="ky-ib" data-ky="stay"'+L+' data-v="-10" aria-label="10분 줄이기">−</button><b>'+(s.stay||0)+'분</b><button class="ky-ib" data-ky="stay"'+L+' data-v="10" aria-label="10분 늘리기">+</button></span>'+
  '<button class="ky-ib" data-ky="up"'+L+(i===0?' disabled':'')+' aria-label="위로">↑</button><button class="ky-ib" data-ky="down"'+L+(i===n-1?' disabled':'')+' aria-label="아래로">↓</button>'+
  '<button class="ky-ib" data-ky="toOther"'+L+'>'+(kim?'일상복 날로':'기모노 날로')+'</button>'+'<button class="ky-ib" data-ky="del"'+L+'>빼기</button></div>'}
function cardHTML(r,n,ln,kim,num){const s=r.s,i=r.i,ctl=ctlHTML(s,i,n,ln,kim),tm='<div class="ky-time">'+fmt(r.arr)+' – '+fmt(r.dep)+'</div>';
 if(s.p==='free')return '<div class="ky-stop free"><div>'+tm+'<div class="ky-name"><button data-ky="rename" data-l="'+ln+'" data-i="'+i+'">'+esc(stopName(s))+'</button></div>'+ctl+'</div></div>';
 const p=place(s.p);if(!p)return '<div class="ky-stop free"><div><div class="ky-name">지워진 장소</div>'+ctl+'</div></div>';
 const t=thumb(p),memo=ST.memo[s.p];
 return '<div class="ky-stop"><button class="ky-th" data-ky="detail" data-p="'+esc(s.p)+'" aria-label="'+esc(p.n)+' 자세히">'+(t?'<img alt="" loading="lazy" src="'+t+'">':'')+(num?'<i class="ky-pin">'+num+'</i>':'')+'</button><div>'+
  tm+'<div class="ky-name"><button data-ky="detail" data-p="'+esc(s.p)+'">'+esc(p.n)+'</button></div>'+
  '<div class="ky-bad">'+(p.rsv.lv===2?'<span class="ky-tag rsv">예약 필수 확인</span>':p.rsv.lv===1?'<span class="ky-tag">예약 추천/확인</span>':'')+(p.photo.lv>=1&&!p.custom?'<span class="ky-tag">촬영 주의 있음</span>':'')+r.warn.map(w=>'<span class="ky-tag warn">'+esc(w)+'</span>').join('')+'</div>'+
  (memo?'<div style="font-size:13px;color:var(--ink-2);white-space:pre-wrap">✎ '+esc(memo)+'</div>':'')+ctl+'</div></div>'}
function renderList(){const D=ST.days[day],c=calc(day),kim=day==='kimono',n=D.stops.length;let num=0,h='';
 h+='<div class="ky-stop base"><div><div class="ky-time">'+fmt(c.start)+'</div><div class="ky-name">'+DAYS[day].base+' · '+esc(D.base.loc?'지도에 찍은 위치':(AREAS[D.base.area]||AREAS.osaka).n)+'</div></div></div>';
 c.rows.forEach(r=>{h+=legHTML(r.leg,r.from,r.to,r.i,'stops');if(r.s.p!=='free'&&place(r.s.p))num++;h+=cardHTML(r,n,'stops',kim,num)});
 if(c.back){h+=legHTML(c.back,c.backFrom,baseLoc(day),'back');
  h+='<div class="ky-stop base"><div><div class="ky-time">'+fmt(c.finish)+'</div><div class="ky-name">'+DAYS[day].back+'</div></div></div>'}
 h+='<div class="ky-row" style="margin-top:12px;justify-content:center"><button class="btn" data-ky="addCustom">+ 새 장소 추가</button><button class="btn ghost" data-ky="openPool">+ 모아둔 장소에서 넣기</button><button class="btn ghost" data-ky="addFree">+ 식사·휴식 시간</button></div>';
 $('#kyList').innerHTML=h;
 let a='';if(c.over!=null){a=c.over>0?'<div class="ky-alert">돌아올 시간('+esc(D.end)+')보다 <b>'+dur(c.over)+'</b> 늦어요. 장소를 빼거나 머무는 시간을 줄여보세요.</div>':'<div class="ky-alert ok">돌아올 시간까지 <b>'+dur(-c.over)+'</b> 여유가 있어요.</div>'}
 $('#kySum').innerHTML='<div class="ky-sum"><div><small>출발</small><b>'+fmt(c.depart)+'</b></div><div><small>끝</small><b>'+fmt(c.finish)+'</b></div><div><small>걷기</small><b>'+dur(c.walk)+'</b></div><div><small>버스·전철</small><b>'+dur(c.trans)+'</b></div></div>'+a+
  (kim?'<div class="ky-note">기모노는 사서 입으니 반납 시간이 없어요. 11월 하순 교토는 해가 16:50쯤 져요. 기모노 걸음은 평소보다 느리게(시속 3.4km) 계산했어요.</div>':'');
 $('#kyMapT').textContent=DAYS[day].n+' 지도'}

const inDay=(k,id)=>ST.days[k].stops.some(s=>s.p===id);
function allPlaces(){return PLACES.concat(Object.keys(ST.custom).map(id=>place(id)))}
function renderPool(){const other=day==='kimono'?'casual':'kimono';const rest=allPlaces().filter(p=>!inDay(day,p.id));
 const left=allPlaces().filter(p=>!inDay('kimono',p.id)&&!inDay('casual',p.id)).length;
 $('#kyPool').innerHTML='<div class="ky-h"><h3>넣을 수 있는 장소</h3><span>이틀 어디에도 없는 곳 '+left+'곳 <button class="mini" data-ky="addCustom">+ 새 장소 추가</button></span></div>'+
  (rest.length?'<div class="ky-pool">'+rest.map(p=>{const t=thumb(p);return '<div class="ky-card"><button class="ky-ph" data-ky="detail" data-p="'+esc(p.id)+'" aria-label="'+esc(p.n)+' 자세히">'+(t?'<img alt="" loading="lazy" src="'+t+'">':'')+'</button><b>'+esc(p.n)+'</b><small>'+esc(p.area||'직접 추가')+(inDay(other,p.id)?' · '+DAYS[other].n+'에 있음':'')+'</small>'+
   '<div class="ky-bad">'+(p.rsv.lv===2?'<span class="ky-tag rsv">예약 필수 확인</span>':'')+(locOf(p.id)?'':'<span class="ky-tag warn">위치 정하기 필요</span>')+'</div>'+
   '<button class="btn ghost" style="padding:4px 10px;font-size:13px" data-ky="add" data-p="'+esc(p.id)+'">+ '+DAYS[day].n+'에 넣기</button></div>'}).join('')+'</div>':'<div class="empty">모든 장소가 이 날 동선에 들어 있어요.</div>')}

function renderInfo(){const li=(p,t)=>'<li><b>'+esc(p.n)+'</b> — '+esc(t)+'</li>';
 const r2=PLACES.filter(p=>p.rsv.lv===2),r1=PLACES.filter(p=>p.rsv.lv===1),ph=PLACES.filter(p=>p.photo.lv>=1);
 $('#kyInfo').innerHTML='<div class="ky-h"><h3>예약 · 촬영 한눈에</h3><span>출발 전 확인</span></div><div class="ky-info">'+
  '<details open><summary>예약해야 하는 곳 ('+r2.length+')</summary><ul>'+r2.map(p=>li(p,p.rsv.t)).join('')+'</ul></details>'+
  '<details><summary>예약하면 좋은 곳 · 확인할 곳 ('+r1.length+')</summary><ul>'+r1.map(p=>li(p,p.rsv.t)).join('')+'</ul></details>'+
  '<details><summary>사진 찍을 때 주의할 곳 ('+ph.length+')</summary><ul>'+ph.map(p=>li(p,p.photo.t)).join('')+'</ul></details>'+
  '<details><summary>이틀에 다 못 가요 — 고르는 기준</summary><ul><li>오하라(산젠인·호센인), 기후네, 루리코인은 모두 북쪽으로 편도 40~80분이라 하루에 한 방향만 가능해요.</li><li>기모노 날은 걷기 편한 곳(히가시야마·후시미 또는 아라시야마) 위주로, 먼 곳은 일상복 날로.</li><li>월요일엔 교세라 미술관·교토 고쇼가 쉬어요(11/23 공휴일은 열고 다음 날 쉼).</li><li>요금·시간은 작년 자료가 섞여 있어요. 예약이 필요한 곳은 공식 사이트에서 다시 확인하세요.</li></ul></details></div>'}

/* ---------- 지도 ---------- */
let mapLoading=false;
function ensureMap(){if(map||mapLoading)return;mapLoading=true;
 const css=document.createElement('link');css.rel='stylesheet';css.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';document.head.appendChild(css);
 const js=document.createElement('script');js.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
 js.onload=()=>{const L=window.L;map=L.map($('#kyMap'),{scrollWheelZoom:false}).setView([35.01,135.77],12);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap'}).addTo(map);
  layer=L.layerGroup().addTo(map);
  map.on('click',e=>{if(!pick)return;const ll={lat:+e.latlng.lat.toFixed(5),lng:+e.latlng.lng.toFixed(5)};const p=pick;pick=null;p.done(ll);renderPick()});
  fitNext=true;drawMap();setTimeout(()=>map.invalidateSize(),200)};
 js.onerror=()=>{$('#kyMap').innerHTML='<div class="empty" style="height:100%">지도를 불러오지 못했어요. 인터넷 연결을 확인해 주세요.</div>'};
 document.head.appendChild(js)}
function drawMap(){if(!map)return;const L=window.L;layer.clearLayers();map.invalidateSize();
 const c=calc(day),pts=[];const icon=(cls,txt)=>L.divIcon({className:'',html:'<div class="ky-pin '+cls+'">'+txt+'</div>',iconSize:[26,26],iconAnchor:[13,13]});
 const bl=baseLoc(day);L.marker([bl.lat,bl.lng],{icon:icon('base','宿'),zIndexOffset:500}).bindPopup('<div class="ky-pop"><b>'+DAYS[day].base+'</b></div>').addTo(layer);if(cluster(bl)!=='OS')pts.push([bl.lat,bl.lng]);
 let num=0;c.rows.forEach(r=>{if(r.s.p==='free')return;const p=place(r.s.p);if(!p)return;num++;if(!r.to)return;
  L.polyline([[r.from.lat,r.from.lng],[r.to.lat,r.to.lng]],{color:r.leg.mode==='walk'?'#9C88B3':'#B97D92',weight:3,dashArray:r.leg.mode==='walk'?null:'6 7'}).addTo(layer);
  L.marker([r.to.lat,r.to.lng],{icon:icon('',num),zIndexOffset:400}).bindPopup(popHTML(p,fmt(r.arr)+' – '+fmt(r.dep),false)).addTo(layer);pts.push([r.to.lat,r.to.lng])});
 if(c.back)L.polyline([[c.backFrom.lat,c.backFrom.lng],[bl.lat,bl.lng]],{color:'#857D90',weight:2,dashArray:'2 7'}).addTo(layer);
 allPlaces().forEach(p=>{if(inDay(day,p.id))return;const l=locOf(p.id);if(!l)return;L.marker([l.lat,l.lng],{icon:L.divIcon({className:'',html:'<div class="ky-pin pool"></div>',iconSize:[14,14],iconAnchor:[7,7]})}).bindPopup(popHTML(p,p.area||'',true)).addTo(layer)});
 if(fitNext&&pts.length){fitNext=false;pts.length>1?map.fitBounds(pts,{padding:[30,30],maxZoom:15}):map.setView(pts[0],14)}}
function popHTML(p,sub,addable){const t=thumb(p);return '<div class="ky-pop">'+(t?'<img alt="" src="'+t+'">':'')+'<b>'+esc(p.n)+'</b><span>'+esc(sub)+'</span><div class="ky-row"><button data-ky="detail" data-p="'+esc(p.id)+'">자세히</button>'+(addable?'<button data-ky="add" data-p="'+esc(p.id)+'">+ 넣기</button>':'')+'</div></div>'}
function renderPick(){$('#kyPick').innerHTML=pick?'<div class="ky-pickbar"><span>지도를 눌러 <b>'+esc(pick.label)+'</b> 위치를 정해주세요</span><button data-ky="pickCancel">취소</button></div>':''}
function startPick(label,done){closeOv();pick={label,done};renderPick();ensureMap();$('#kyPick').scrollIntoView({block:'start',behavior:'smooth'})}

/* ---------- 팝업 창 ---------- */
let ov=null;
function closeOv(){if(ov){ov.remove();ov=null}}
function openOv(html){closeOv();ov=document.createElement('div');ov.className='overlay';ov.innerHTML='<div class="sheet ky-sheet" role="dialog" aria-modal="true">'+html+'</div>';document.body.appendChild(ov);
 ov.addEventListener('click',e=>{if(e.target===ov){closeOv();return}onClick(e)});ov.addEventListener('change',onChange);ov.addEventListener('input',onInput);
 api.fitOverlay&&api.fitOverlay(ov);return ov}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&ov)closeOv()});

function openDetail(id){const p=place(id);if(!p)return;const l=locOf(id);const imgs=p.custom?(thumb(p)?['<img alt="" src="'+thumb(p)+'">']:[]):p.ph.map(f=>'<img alt="'+esc(p.n)+' 참고 사진" loading="lazy" src="'+PH+f+'">');
 const row=(t,v)=>v?'<div><dt>'+t+'</dt><dd>'+esc(v)+'</dd></div>':'';
 const q=encodeURIComponent((p.jp||p.n)+' 京都');
 openOv('<h3>'+esc(p.n)+(p.jp?' <small class="muted" style="font-size:13px">'+esc(p.jp)+'</small>':'')+'</h3>'+
  (imgs.length?'<div class="ky-gal">'+imgs.join('')+'</div>':'')+(p.cr?'<div class="ky-note" style="margin:0">'+esc(p.cr)+'</div>':'')+
  '<div class="ky-bad">'+(p.area?'<span class="ky-tag">'+esc(p.area)+'</span>':'')+(p.rsv.lv===2?'<span class="ky-tag rsv">예약 필수 확인</span>':p.rsv.lv===1?'<span class="ky-tag">예약 추천/확인</span>':p.custom?'':'<span class="ky-tag good">예약 불필요</span>')+'</div>'+
  '<dl class="ky-dl">'+row('특징',p.feat)+row('예약',p.rsv.t)+row('사진 촬영',p.photo.t)+row('시간',p.hours)+row('요금',p.fee)+row('가는 법',p.how)+row('기모노로 가기',p.kimono)+row('팁',p.tip)+(p.custom?row('메모',p.note):'')+'</dl>'+
  '<div class="field"><label for="kyMemo">우리 메모 · 기록</label><textarea id="kyMemo" rows="3" data-ky="memo" data-p="'+esc(id)+'" placeholder="찍고 싶은 포즈, 예약 번호, 먹을 것…">'+esc(ST.memo[id]||'')+'</textarea></div>'+
  '<div class="ky-row">'+(l?'<a class="ky-lk" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query='+(p.custom?l.lat+','+l.lng:q)+'">구글맵에서 보기 ↗</a>':'<a class="ky-lk" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query='+q+'">구글맵에서 찾기 ↗</a>')+
  '<button class="mini" data-ky="relocate" data-p="'+esc(id)+'">'+(l?'위치 고치기':'위치 정하기')+'</button>'+(p.custom?'<button class="mini" data-ky="delCustom" data-p="'+esc(id)+'">이 장소 지우기</button>':'')+'</div>'+
  '<div class="sheet-actions"><div class="r">'+(['kimono','casual'].map(k=>inDay(k,id)?'':'<button class="btn ghost" data-ky="addTo" data-d="'+k+'" data-p="'+esc(id)+'">+ '+DAYS[k].n+'</button>').join(''))+'<button class="btn" data-ky="close">닫기</button></div></div>')}

let draft=null;
function openCustom(){draft=draft||{name:'',loc:null,stay:60,note:'',img:''};
 openOv('<h3>새 장소 추가</h3>'+
  '<div class="field"><label for="kyCn">이름</label><input type="text" id="kyCn" data-ky="cName" value="'+esc(draft.name)+'" placeholder="예) 기요미즈데라, 스타벅스 니넨자카"></div>'+
  '<div class="field"><span class="lab">위치</span><div class="ky-row"><button class="btn ghost" data-ky="cSearch">이름으로 찾기</button><button class="btn ghost" data-ky="cPick">지도에서 찍기</button></div><div id="kyCres" class="ky-res"></div>'+
  '<span class="hint" id="kyCloc">'+(draft.loc?'위치를 정했어요 ✓ ('+draft.loc.lat+', '+draft.loc.lng+')':'위치를 안 정하면 이동 시간 계산에서 빠져요.')+'</span></div>'+
  '<div class="field"><label for="kyCs">머무는 시간(분)</label><input type="number" id="kyCs" data-ky="cStay" inputmode="numeric" min="0" step="10" value="'+esc(draft.stay)+'"></div>'+
  '<div class="field"><label for="kyCm">메모</label><textarea id="kyCm" rows="2" data-ky="cNote" placeholder="왜 가고 싶은지, 예약 여부 등">'+esc(draft.note)+'</textarea></div>'+
  (api.upload?'<div class="field"><span class="lab">사진 (선택)</span><input type="file" accept="image/*" data-ky="cImg"><span class="hint" id="kyCimg">'+(draft.img?'사진을 올렸어요 ✓':'')+'</span></div>':'')+
  '<div class="sheet-actions"><div class="r"><button class="btn ghost" data-ky="cCancel">닫기</button><button class="btn" data-ky="cSave">'+DAYS[day].n+'에 추가</button></div></div>')}

/* ---------- 동작 ---------- */
function mutate(fn,keepOpt){fn();if(!keepOpt)ST.days[day].opt='';changed();render()}
function addStop(k,id){const p=place(id),st={k:uid(),p:id,stay:(p&&p.stay)||60,mode:'auto',min:null};
 ST.days[k].stops.push(st);ST.days[k].opt='';fitNext=true;changed();render();api.toast&&api.toast(DAYS[k].n+'에 넣었어요')}
async function onClick(e){const b=e.target.closest('[data-ky]');if(!b||b.tagName==='INPUT'||b.tagName==='TEXTAREA')return;const a=b.dataset.ky,D=ST.days[day],i=+b.dataset.i,id=b.dataset.p,LS=D.stops,keep=false;
 if(a==='day'){day=b.dataset.v;try{localStorage.setItem('kyDay',day)}catch(_){}fitNext=true;render()}
 else if(a==='area')mutate(()=>{D.base.area=b.dataset.v;D.base.loc=null;fitNext=true},true);
 else if(a==='pickBase')startPick('숙소',ll=>mutate(()=>{D.base.loc=ll;fitNext=true},true));
 else if(a==='pickCancel'){pick=null;renderPick()}
 else if(a==='useOpt'){const o=OPTS[day].find(x=>x.id===b.dataset.v);if(!o)return;if(D.opt!==o.id&&D.stops.length&&!D.opt&&!confirm('지금 고친 '+DAYS[day].n+' 동선을 “'+o.n+'”(으)로 바꿀까요?'))return;
  mutate(()=>{D.stops=buildStops(o);D.opt=o.id;D.backMin=null;D.backMode=null;fitNext=true},true);$('#kyMapT').scrollIntoView({block:'start',behavior:'smooth'})}
 else if(a==='stay')mutate(()=>{LS[i].stay=Math.max(0,(LS[i].stay||0)+(+b.dataset.v))},keep);
 else if(a==='up'||a==='down'){const j=a==='up'?i-1:i+1;if(j<0||j>=LS.length)return;mutate(()=>{const t=LS[i];LS[i]=LS[j];LS[j]=t;[LS[i],LS[j]].forEach(s=>{s.min=null;s.mode='auto'});D.backMin=null;D.backMode=null;},keep)}
 else if(a==='del')mutate(()=>{LS.splice(i,1);const n=LS[i];if(n){n.min=null;n.mode='auto'}D.backMin=null;D.backMode=null;fitNext=true},keep);
 else if(a==='toOther'){const o=day==='kimono'?'casual':'kimono';mutate(()=>{const s=LS.splice(i,1)[0];s.min=null;s.mode='auto';ST.days[o].stops.push(s);ST.days[o].opt='';fitNext=true});api.toast&&api.toast(DAYS[o].n+' 맨 뒤로 옮겼어요')}
 else if(a==='rename'){const s=LS[i];const t=prompt('이름 (예: 점심, 카페 휴식)',s.name||'');if(t!=null)mutate(()=>{s.name=t.trim().slice(0,30)||'자유 일정'},keep)}
 else if(a==='mode')mutate(()=>{const k=b.dataset.i;if(k==='back'){D.backMode=b.dataset.v;D.backMin=null}else{LS[i].mode=b.dataset.v;LS[i].min=null}},keep);
 else if(a==='legMin'){const back=b.dataset.i==='back';const cur=back?D.backMin:LS[i].min;const t=prompt('이동 시간을 분으로 적어주세요.\n구글맵에서 본 실제 시간을 넣으면 정확해져요. 비우면 자동 계산으로 돌아가요.',cur!=null?cur:'');if(t==null)return;const v=t.trim()===''?null:Math.max(0,Math.round(Number(t)));if(v!==null&&isNaN(v))return;mutate(()=>{if(back)D.backMin=v;else LS[i].min=v},keep)}
 else if(a==='openPool'){renderPool();$('#kyPool').scrollIntoView({block:'start',behavior:'smooth'})}
 else if(a==='addFree')mutate(()=>{D.stops.push({k:uid(),p:'free',name:'식사·휴식',stay:60,mode:'auto',min:null})});
 else if(a==='add'){addStop(day,id);map&&map.closePopup()}
 else if(a==='addTo'){addStop(b.dataset.d,id);closeOv()}
 else if(a==='detail')openDetail(id);
 else if(a==='close')closeOv();
 else if(a==='relocate'){const p=place(id);startPick(p.n,ll=>{if(ST.custom[id]){ST.custom[id].lat=ll.lat;ST.custom[id].lng=ll.lng}else ST.loc[id]=ll;fitNext=true;changed();render();api.toast&&api.toast('위치를 정했어요')})}
 else if(a==='delCustom'){if(!confirm('이 장소를 완전히 지울까요?'))return;const img=ST.custom[id]&&ST.custom[id].img;delete ST.custom[id];delete ST.memo[id];['kimono','casual'].forEach(k=>{ST.days[k].stops=ST.days[k].stops.filter(s=>s.p!==id)});if(img&&api.removeImg)api.removeImg(img);closeOv();changed();render()}
 else if(a==='addCustom'){draft=null;openCustom()}
 else if(a==='cCancel'){draft=null;closeOv()}
 else if(a==='cPick'){if(!draft.name.trim()){api.toast&&api.toast('이름을 먼저 적어주세요');return}startPick(draft.name,ll=>{draft.loc=ll;openCustom()})}
 else if(a==='cSearch'){const box=ov.querySelector('#kyCres');if(!draft.name.trim()){api.toast&&api.toast('이름을 먼저 적어주세요');return}box.innerHTML='<span class="hint">찾는 중…</span>';
  try{const r=await fetch('https://nominatim.openstreetmap.org/search?format=json&limit=5&accept-language=ko&viewbox=135.5,35.25,135.95,34.8&bounded=1&q='+encodeURIComponent(draft.name.trim()));const j=await r.json();
   if(!ov)return;const bx=ov.querySelector('#kyCres');if(!bx)return;
   bx.innerHTML=j.length?j.map(x=>'<button data-ky="cRes" data-lat="'+(+x.lat).toFixed(5)+'" data-lng="'+(+x.lon).toFixed(5)+'">'+esc(x.display_name)+'</button>').join(''):'<span class="hint">못 찾았어요. 일본어·영어 이름으로 다시 찾거나 “지도에서 찍기”를 써주세요.</span>'}
  catch(err){box.innerHTML='<span class="hint">검색하지 못했어요. “지도에서 찍기”를 써주세요.</span>'}}
 else if(a==='cRes'){draft.loc={lat:+b.dataset.lat,lng:+b.dataset.lng};ov.querySelector('#kyCres').innerHTML='';ov.querySelector('#kyCloc').textContent='위치를 정했어요 ✓ '+b.textContent.slice(0,40)}
 else if(a==='cSave'){if(!draft.name.trim()){api.toast&&api.toast('이름을 적어주세요');return}const cid='c_'+uid();
  ST.custom[cid]={n:draft.name.trim().slice(0,40),lat:draft.loc?draft.loc.lat:null,lng:draft.loc?draft.loc.lng:null,stay:Math.max(0,Math.round(+draft.stay)||60),note:draft.note.trim(),img:draft.img||'',area:'직접 추가'};
  draft=null;closeOv();addStop(day,cid)}
}
function onInput(e){const t=e.target,a=t.dataset&&t.dataset.ky;if(!a||!draft&&a!=='memo')return;
 if(a==='cName')draft.name=t.value;else if(a==='cStay')draft.stay=t.value;else if(a==='cNote')draft.note=t.value;
 else if(a==='memo'){const v=t.value.slice(0,600);if(v.trim())ST.memo[t.dataset.p]=v;else delete ST.memo[t.dataset.p];changed()}}
async function onChange(e){const t=e.target,a=t.dataset&&t.dataset.ky,D=ST.days[day];if(!a)return;
 if(a==='start'&&toMin(t.value)!=null)mutate(()=>{D.start=t.value},true);
 else if(a==='end')mutate(()=>{D.end=toMin(t.value)!=null?t.value:''},true);
 else if(a==='memo'){renderList()}
 else if(a==='cImg'&&t.files&&t.files[0]&&api.upload){const st=ov.querySelector('#kyCimg');st.textContent='올리는 중…';try{draft.img=await api.upload(t.files[0]);st.textContent='사진을 올렸어요 ✓'}catch(err){st.textContent='사진을 올리지 못했어요.'}}}

window.KyotoRoute={init,connect,refresh:()=>{if(map){map.invalidateSize();fitNext=true;drawMap()}}};
})();
