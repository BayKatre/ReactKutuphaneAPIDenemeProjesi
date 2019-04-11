# React Kutuphane API Deneme Projesi
Mock API'den veri çekerek işlemler yapmamıza yarayan bir React-TypeScript Projesi

## Başlarken
İlk defa React öğrenmeye başladığım bu projede REST bir API ile nasıl dans edilir bunları öğrenmiş oldum. Aslında bir staj başvurum sonucu bana gelen proje olsa da hem yaparken keyif aldığım hem de çok şey öğrendiğmi bir proje oldu. :)

## Proje Hakkında
https://baykatre.github.io/ReactKutuphaneAPIDenemeProjesi/ linkinden erişebileceğiniz proje ana sayfasında kitap, yazar ve yayınevi bilgilerimiz mockapi üzerinde tutulan bağımsız üç tablodan çekilerek getiriliyor. Sadece kitap tablosunda tanımlamak için yazarID ve yayineviID değişkenleri bulunuyor. 

Kitaplarımız beşerli listeler halinde size gösteriliyor üst ortada kitap, yazar veya yayınevi parametreleri ile arama yapabileceğimiz bir arama panelimiz onun hemen yanında yeni kitap oluşturmak için butonumuz, sağ alt köşede sayfa geçiş butonlarımız ve sol alt kısımda da sayfa bilgilendirme metnimiz bulunuyor.

![screenshot-desktop](https://user-images.githubusercontent.com/26842312/55956201-12043600-5c6c-11e9-9ab1-e3a20f6b730e.png)

## Arama Paneli

Canlı olarak güncellenen arama paneline bağlı olan listemiz arama sonuçlarına göre sayfa numaralarını da düzenleyip yine arama sonuçlarını da beşer beşer listelemeye devam ediyor. Hemen arama panelinin yanındaki seçeneklerden varsayılan olarak kitap araması için ayarlı olan parametreyi yazar veya yayınevi aramak için değiştirebilirsiniz. :)

![screenshot-desktop](https://user-images.githubusercontent.com/26842312/55956225-1e888e80-5c6c-11e9-940d-d4a0afe2291d.png)

## Detay

Kitapların hemen yanında bulunan "Detay" kısmından kitap hakkında detaylı bilgilere ulaşabiliyoruz.

![screenshot-desktop](https://user-images.githubusercontent.com/26842312/55956210-16c8ea00-5c6c-11e9-8c38-8630694a6867.png)

## Yeni Kitap

Kitap Ekle butonumuza bastığımızda gelen sayfada yeni kitap bilgilerini girerek kitap eklemesi yapabiliyoruz. Burda dezavantajımız yeni yazar ve yeni yayınevi ekleme panelimiz olmadığı için daha önceden eklenmiş olan seçeneklerden yapabiliyoruz. Geniş zamanda eklenebilecek güzel bir opsiyon olabilir. :) 

** Burda gördüğüm bir bug var uygulamada. İlk kez "Kitap Ekle" butonuna basıp kitap eklemeye çalışında sayfa refresh oluyor fakat ikinci denemede ekleniyor. Çözemediğim ilginç bir problem. :)

![screenshot-desktop](https://user-images.githubusercontent.com/26842312/55956215-192b4400-5c6c-11e9-89e1-f059b6669397.png)

![screenshot-desktop](https://user-images.githubusercontent.com/26842312/55956207-14669000-5c6c-11e9-907d-230d08114978.png)
