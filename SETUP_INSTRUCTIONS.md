# 🚀 Kurulum Tamamlandı!

Next.js projeniz ve Supabase entegrasyon alt yapısı başarıyla hazırlandı.

## 🛑 Yapmanız Gerekenler (Önemli!)

Supabase veritabanına bağlanabilmek için `.env.local` dosyasını düzenlemeniz gerekmektedir.

1.  [Supabase Dashboard](https://supabase.com/dashboard) adresine gidin.
2.  Yeni bir proje oluşturun.
3.  Project Settings -> API bölümünden `URL` ve `anon public` anahtarınızı kopyalayın.
4.  Proje ana dizinindeki `.env.local` dosyasını açın ve aşağıdaki alanları doldurun:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

5.  Bu işlemi tamamladıktan sonra terminalde `npm run dev` komutu ile projeyi çalıştırabilirsiniz.
