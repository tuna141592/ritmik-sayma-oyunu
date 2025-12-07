# Ritmik Sayma Oyunu

Bu proje, Ritmik Sayma Oyunu'nun (Rhythmic Counting Game) geliştirilme adımlarını özetlemektedir.

## Proje Kurulumu

1.  **Proje yapısı oluşturuldu:**
    *   `mkdir -p js css audio`
    *   `touch index.html css/style.css js/app.js`

2.  **Temel HTML yapısı oluşturuldu:**
    *   Ana kapsayıcı, oyun bilgi bölümü, oyun alanı ve başlat düğmesi eklendi.
    *   CSS ve JavaScript dosyaları bağlandı.

3.  **Temel CSS stil tanımlamaları yapıldı:**
    *   Kapsayıcı, oyun bilgisi, oyun alanı, sayı kutuları ve başlat düğmesi stillendirildi.

4.  **Çekirdek oyun mantığı JavaScript'te uygulandı:**
    *   Oyun değişkenleri (seviye, puan, zamanlayıcı vb.) tanımlandı.
    *   Farklı diziler ve süreler içeren bir `levels` dizisi oluşturuldu.
    *   `startGame`, `startLevel`, `generateNumbers`, `checkAnswer`, `updateTimer` ve `endGame` fonksiyonları uygulandı.

## Görsel İyileştirmeler

1.  **Zorluk artırıldı:**
    *   Daha uzun diziler ve daha kısa sürelerle `levels` dizisine daha fazla seviye eklendi.

2.  **Görsel geri bildirim eklendi:**
    *   Tıklandığında sayı kutularına `correct` ve `incorrect` sınıfları eklendi.
    *   `correct` ve `incorrect` sınıfları CSS'te farklı renkler ve animasyonlarla stillendirildi.

3.  **İlerleme çubuğu eklendi:**
    *   `index.html` dosyasına bir ilerleme çubuğu öğesi eklendi.
    *   İlerleme çubuğu CSS'te stillendirildi.
    *   `updateTimer` fonksiyonu, ilerleme çubuğunun genişliğini değiştirecek şekilde güncellendi.

4.  **Genel tasarım iyileştirildi:**
    *   Daha eğlenceli bir yazı tipi kullanıldı.
    *   Renk şeması güncellendi.
    *   Sayı kutularına ve düğmelere hover efektleri ve kutu gölgeleri eklendi.

## Özellik Eklemeleri

1.  **İpucu düğmesi eklendi:**
    *   `index.html` dosyasına bir ipucu düğmesi eklendi.
    *   İpucu düğmesi CSS'te stillendirildi.
    *   JavaScript'te bir sonraki doğru sayıyı vurgulamak için `showHint` fonksiyonu uygulandı.
    *   İpucu düğmesi kullanıldığında puan düşüldü.

2.  **Ses efektleri ve arka plan müziği eklendi:**
    *   Bir `audio` dizini oluşturuldu.
    *   `index.html` dosyasına doğru/yanlış sesleri ve arka plan müziği için `<audio>` öğeleri eklendi.
    *   Sesleri uygun zamanlarda çalmak için JavaScript mantığı eklendi.
    *   **Not:** Ses dosyaları (`correct.wav`, `incorrect.wav`, `background.wav`) oluşturulmadı ve kullanıcı tarafından sağlanması gerekmektedir.

3.  **Sessize alma düğmesi eklendi:**
    *   `index.html` dosyasına bir sessize alma düğmesi eklendi.
    *   Sessize alma düğmesi CSS'te stillendirildi.
    *   Tüm sesleri sessize almak/açmak için JavaScript'te `toggleMute` fonksiyonu uygulandı.

## Oyunlaştırma

1.  **Karakter seçim ekranı eklendi:**
    *   Oyuncuların bir karakter (robot, kedi veya uzaylı) seçmesi için bir `character.html` dosyası oluşturuldu.
    *   Seçilen karakter `localStorage`'da saklanır ve oyun ekranında görüntülenir.
    *   Karakterler için yer tutucu görseller oluşturuldu.

2.  **İlerleme için bir harita eklendi:**
    *   `index.html` dosyasına bir harita eklendi.
    *   Oyuncunun puanı arttıkça karakter harita üzerinde hareket eder.
    *   Harita için yer tutucu bir görsel oluşturuldu.

3.  **Yeni soru türleri eklendi:**
    *   **Boşluk doldurma:** Bazı seviyeler, oyuncunun eksik bir sayıyı tanımlamasını gerektiren bir dizi sunar.
    *   **Ters Ritmik Sayma:** Oyuncuların geriye doğru saymasını gerektiren seviyeler eklendi.
    *   Bu yeni soru türlerini desteklemek için `levels` dizisi ve oyun mantığı güncellendi.
