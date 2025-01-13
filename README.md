# Yemek Sepeti Clone

- kullanılan teknolojiler
- React
- Redux
- react-redux
- axios
- react-router-dom
- resimler için : https://picsum.photos/

# Redux Thunk ile Asenkron İşlemler

- Redux Thunk, Redux'a asenkron işlemleri yönetme yeteneği ekleyen bir middleware'dir. Thunk, normalde aksiyon yaratıcılarının eylemleri hemen döndürmesi gerektiği yerde, bir fonksiyon döndürmesine izin verir. Bu, API çağrıları gibi yan etkileri olan işlemleri yönetmeyi kolaylaştırır.

# Actionlar ve Reducerlar Arasındaki İlişki

- Redux Thunk kullanarak asenkron işlemleri yönetmek için aşağıdaki adımları izleyebilirsiniz:

- Action Types: Öncelikle, eylem türlerini tanımlayın.

- actionTypes.js dosyasından  
  export const ActionTypes = {
  FETCH_DATA_REQUEST: "FETCH_DATA_REQUEST",
  FETCH_DATA_SUCCESS: "FETCH_DATA_SUCCESS",
  FETCH_DATA_FAILURE: "FETCH_DATA_FAILURE",
  };

tanımlayarak

- Action Creators: Asenkron işlemleri başlatan aksiyon yaratıcılarını tanımlayın. Thunk sayesinde, bu aksiyon yaratıcıları API çağrılarını içerebilir.

import { ActionTypes } from "./actionTypes";
import axios from "axios";

export const fetchData = () => {
return async (dispatch) => {
dispatch({ type: ActionTypes.FETCH_DATA_REQUEST });

    try {
      const response = await axios.get("https://api.example.com/data");
      dispatch({
        type: ActionTypes.FETCH_DATA_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.FETCH_DATA_FAILURE,
        payload: error.message,
      });
    }

};
};

- Reducer: Eylemleri işleyen ve durumu güncelleyen reducer fonksiyonunu tanımlayın.

import { ActionTypes } from "./actionTypes";

const initialState = {
data: [],
isLoading: false,
error: null,
};

const dataReducer = (state = initialState, action) => {
switch (action.type) {
case ActionTypes.FETCH_DATA_REQUEST:
return { ...state, isLoading: true, error: null };

case ActionTypes.FETCH_DATA_SUCCESS:
return { ...state, isLoading: false, data: action.payload };

case ActionTypes.FETCH_DATA_FAILURE:
return { ...state, isLoading: false, error: action.payload };

default:
return state;
}
};

export default dataReducer;

# API Çağrıları ve Redux Thunk

- Yukarıdaki örnekte, fetchData aksiyon yaratıcı fonksiyonu, bir API çağrısı başlatır ve verileri almayı dener. Bu işlem sırasında, eylem türleri (FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE) kullanılarak durum yönetilir:

- FETCH_DATA_REQUEST: API çağrısı başlatıldığında, yükleme durumunu (isLoading) true yapar ve hata mesajını (error) sıfırlar.

- FETCH_DATA_SUCCESS: API çağrısı başarıyla tamamlandığında, yükleme durumunu false yapar ve gelen verileri duruma ekler.

- FETCH_DATA_FAILURE: API çağrısı başarısız olduğunda, yükleme durumunu false yapar ve hata mesajını duruma ekler.

- Redux Thunk sayesinde, aksiyon yaratıcıları asenkron işlemleri kolayca yönetebilir ve yan etkileri kontrol edebilir hale gelir.

# Middleware Nedir ?

- MW, yazılım geliştirmede, iki olay arasıda çalışan koddur.
- Örneğin bir api istğeinin bir uçtan diğer uca iletilirken araya girip bu isteği işleyen bir mw yazılabilir.

- Thunk Mw Nedir ?
- Redux thunk , redux'ta kullanılan bir middleware'dir.

- Redux thunk, normalde sadece obje dönen aksiyonlar yerine fonksiyon dönen aksiyonlar yazmamıza olanak sağlar.

- Redux thunk akiyonların içierisinde döndürdüğümüz bu fonksiyonları çalıştırır bu fonksiyonlar içirisinde asenkrın işlemler yapılabilir ve işlemler sırasında dispatch kullanıalbilir.

-Middleware Nedir ?
Middleware, yazılım uygulamaları arasında köprü görevi gören bir yazılım katmanıdır. Özellikle uygulama geliştirme ve web uygulamaları bağlamında, middleware, belirli işlevleri yerine getiren ve istemci (client) ile sunucu (server) arasındaki iletişimi yöneten kod parçacıklarıdır.

İşte middleware hakkında bazı temel bilgiler:

- Middleware'in Görevleri
  İstek ve Yanıt İşleme: Middleware, bir uygulamaya gelen istekleri (request) ve uygulamadan gelen yanıtları (response) işleyebilir. Örneğin, bir web sunucusunda kullanıcı isteklerini doğrulama, kimlik doğrulama, yetkilendirme ve hata işleme gibi görevleri yerine getirebilir.

Katmanlı Mimari: Middleware, uygulamanın farklı katmanları arasında yer alır ve bu katmanlar arasında veri alışverişini sağlar. Bu sayede uygulamanın işlevselliğini ve performansını artırır.

Özelleştirme ve Esneklik: Middleware, uygulamanın belirli bölümlerini özelleştirmenize ve genişletmenize olanak tanır. Örneğin, bir web sunucusunda yeni middleware ekleyerek belirli özellikleri veya işlevleri ekleyebilirsiniz.

Örnekler ve Kullanım Alanları
Kimlik Doğrulama ve Yetkilendirme: Bir kullanıcının kimliğini doğrulamak ve yetkisini kontrol etmek için kullanılan middleware'ler.

Hata İşleme: Uygulamada meydana gelen hataları yakalayan ve yönetim sağlamak için kullanılan middleware'ler.

Veri Dönüştürme: Gelen isteklerdeki verileri uygun formata dönüştüren veya yanıtları işleyen middleware'ler.

Günlük Kaydı: Uygulama etkinliklerini ve hataları izlemek için kullanılan middleware'ler.

İstek Yönlendirme: Gelen istekleri belirli rotalara veya bileşenlere yönlendiren middleware'ler.

# Redux Thunk ve Middleware

- Redux bağlamında, middleware, Redux mağazasına (store) yapılan eylemleri (action) işlemek için kullanılır. Redux Thunk, asenkron işlemleri yönetmek için yaygın olarak kullanılan bir middleware örneğidir. Thunk, action yaratıcılarının eylem yerine fonksiyon döndürmesine izin verir ve bu sayede asenkron çağrılar yapılabilir.

// Klasik yöntem
useEffect(() => {
dispatch(setLoading());

api
.get("/restaurants")
.then((res) => dispatch(setRestaurants(res.data)))
.catch((err) => dispatch(setError(err)));
}, []);

// Thunk ile
useEffect(() => {
dispatch(getRestaurants());
}, []);
