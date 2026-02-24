export const communicationScenarios = {
    en: [
        {
            id: 'email-bug-report',
            title: 'Bug Report Email',
            icon: '📧',
            scenario: `Write an email to your team about a critical bug in production.

**Context:**
- The login system is down
- It started 30 minutes ago
- You've identified the cause
- You need immediate attention

**Key phrases to use:**
- "I'm writing to inform you..."
- "We're currently experiencing..."
- "The root cause appears to be..."
- "Immediate action is required..."`,
            template: `Subject: [URGENT] Production Login System Down

Hi Team,

I'm writing to inform you about a critical issue affecting our production environment.

**Issue:** [Describe the problem]

**Impact:** [Who is affected]

**Root Cause:** [What you found]

**Proposed Solution:** [Your recommendation]

**Timeline:** [When you expect to fix it]

Please let me know if you need any additional information.

Best regards,
[Your Name]`,
            tips: [
                'Use clear, direct subject lines with [URGENT] or [CRITICAL] tags',
                'Start with the problem, not pleasantries',
                'Use bullet points for clarity',
                'Include impact and proposed solutions',
                'Specify timeline expectations',
            ],
        },
        {
            id: 'standup-update',
            title: 'Daily Standup Update',
            icon: '🗣️',
            scenario: `Prepare your daily standup update for the team meeting.

**Your situation:**
- Yesterday: Completed user authentication feature
- Today: Will work on password reset functionality
- Blocker: Waiting for design mockups from the design team

**Follow the format:**
1. What I did yesterday
2. What I'm doing today
3. Any blockers`,
            template: `Yesterday:
- [List completed tasks]
- [Any achievements or milestones]

Today:
- [Planned tasks]
- [What you'll focus on]

Blockers:
- [Any issues preventing progress]
- [Who you're waiting on]

Quick note: [Any additional context]`,
            tips: [
                'Be concise - aim for 1-2 minutes maximum',
                'Use past tense for yesterday, future/present for today',
                'Be specific about blockers and who can help',
                'Mention dependencies on other team members',
                'Use action verbs: completed, implemented, fixed, working on',
            ],
        },
        {
            id: 'code-review',
            title: 'Code Review Comments',
            icon: '👀',
            scenario: `Write constructive feedback for a colleague's pull request.

**The PR:**
- Adds a new API endpoint
- Has some security concerns
- Missing error handling
- Good overall structure

**Remember:**
- Be professional and constructive
- Explain WHY, not just WHAT
- Suggest solutions, don't just point out problems`,
            template: `Overall: This PR looks good! The API structure is clean and follows our conventions.

**Suggestions:**

1. **Security Concern (Line 45):**
   Current: [What they did]
   Issue: [Why it's a problem]
   Suggestion: [How to fix it]

2. **Error Handling (Line 78):**
   Consider adding try-catch block here to handle potential database errors gracefully.

3. **Minor:** Variable naming at line 23 - consider using \`userId\` instead of \`uid\` for clarity.

**Nitpicks:**
- Missing JSDoc comment for the main function
- Could extract validation logic into a separate function

Great work overall! Let me know if you have questions.`,
            tips: [
                'Start with something positive',
                'Use "we/our" instead of "you/your" to be collaborative',
                'Categorize feedback: Critical, Suggestions, Nitpicks',
                'Explain the reasoning behind your comments',
                'Offer to pair program on complex issues',
                'Use phrases like "Consider...", "What do you think about...", "Suggestion:"',
            ],
        },
        {
            id: 'tech-presentation',
            title: 'Technical Presentation',
            icon: '📊',
            scenario: `Prepare a 5-minute presentation about a new feature you built.

**Feature:** Real-time notification system
**Audience:** Entire engineering team (25 people)
**Goal:** Explain the architecture and how others can use it`,
            template: `**Slide 1: Title**
"Real-Time Notification System: Architecture & Integration"

**Slide 2: Problem Statement**
"Before: Users had to refresh to see updates
Now: Instant notifications using WebSockets"

**Slide 3: Architecture Overview**
- Frontend: WebSocket client
- Backend: Node.js WebSocket server
- Message Queue: Redis for scalability

**Slide 4: How to Integrate**
1. Import the NotificationClient
2. Initialize with user credentials
3. Subscribe to events
4. Handle incoming messages

**Slide 5: Demo**
[Live demonstration]

**Slide 6: Q&A**
"Questions? I'm available after for detailed discussions"

**Speaking Notes:**
- Start with: "Good morning everyone, today I'll be presenting..."
- Transitions: "Moving on to...", "Let's take a look at...", "Now I'll show you..."
- Closing: "To summarize...", "In conclusion...", "Thank you for your time"`,
            tips: [
                'Start with a clear problem statement',
                'Use simple language, explain acronyms first time',
                'Show visual diagrams when possible',
                'Include live demos if appropriate',
                'Leave time for questions',
                'Practice pronunciation of technical terms beforehand',
                'Speak slowly and clearly - especially if English isn\'t your first language',
            ],
        },
    ],
    tr: [
        {
            id: 'email-bug-report',
            title: 'Hata Bildirim E-postası',
            icon: '📧',
            scenario: `Üretim ortamındaki kritik bir hata hakkında ekibinize bir e-posta yazın.

**Bağlam:**
- Giriş sistemi çalışmıyor
- 30 dakika önce başladı
- Nedeni belirlediniz
- Acil müdahale gerekiyor

**Kullanılacak anahtar kelimeler:**
- "Size bilgi vermek için yazıyorum..."
- "Şu anda ... yaşıyoruz"
- "Temel neden ... gibi görünüyor"
- "Acil eylem gerektiriyor..."`,
            template: `Konu: [ACİL] Üretim Giriş Sistemi Çalışmıyor

Merhaba Ekip,

Üretim ortamımızı etkileyen kritik bir sorun hakkında size bilgi vermek için yazıyorum.

**Sorun:** [Sorunu açıklayın]

**Etki:** [Kimler etkileniyor]

**Temel Neden:** [Ne buldunuz]

**Önerilen Çözüm:** [Öneriniz]

**Zaman Çizelgesi:** [Ne zaman düzeltmeyi bekliyorsunuz]

Ek bilgiye ihtiyacınız olursa lütfen bana bildirin.

Saygılarımla,
[Adınız]`,
            tips: [
                '[ACİL] veya [KRİTİK] etiketleriyle açık, doğrudan konu satırları kullanın',
                'Nezaket ifadelerinden önce sorunla başlayın',
                'Netlik için madde işaretleri kullanın',
                'Etki ve önerilen çözümleri ekleyin',
                'Zaman çizelgesi beklentilerini belirtin',
            ],
        },
        {
            id: 'standup-update',
            title: 'Günlük Standup Güncellemesi',
            icon: '🗣️',
            scenario: `Ekip toplantısı için günlük standup güncellemenizi hazırlayın.

**Durumunuz:**
- Dün: Kullanıcı kimlik doğrulama özelliği tamamlandı
- Bugün: Parola sıfırlama işlevselliği üzerinde çalışacağım
- Engel: Tasarım ekibinden tasarım taslakları bekleniyor

**Formatı izleyin:**
1. Dün ne yaptım
2. Bugün ne yapıyorum
3. Varsa engeller`,
            template: `Dün:
- [Tamamlanan görevleri listele]
- [Herhangi bir başarı veya dönüm noktası]

Bugün:
- [Planlanan görevler]
- [Neye odaklanacaksınız]

Engeller:
- [İlerlemeyi engelleyen herhangi bir sorun]
- [Kimi bekliyorsunuz]

Kısa bir not: [Ek bağlam]`,
            tips: [
                'Kısa olun - maksimum 1-2 dakikayı hedefleyin',
                'Dün için geçmiş zamanı, bugün için gelecek/şimdiki zamanı kullanın',
                'Engeller ve kimin yardım edebileceği konusunda spesifik olun',
                'Diğer ekip üyelerine olan bağımlılıkları belirtin',
                'Eylem fiilleri kullanın: tamamlandı, uygulandı, düzeltildi, üzerinde çalışılıyor',
            ],
        },
        {
            id: 'code-review',
            title: 'Kod İnceleme Yorumları',
            icon: '👀',
            scenario: `Bir iş arkadaşınızın çekme isteği (PR) için yapıcı geri bildirim yazın.

**PR (Çekme İsteği):**
- Yeni bir API uç noktası ekliyor
- Bazı güvenlik endişeleri var
- Hata yönetimi eksik
- Genel yapı iyi

**Unutmayın:**
- Profesyonel ve yapıcı olun
- Sadece NE olduğunu değil, NEDENİ açıklayın
- Sadece sorunları işaret etmeyin, çözümler önerin`,
            template: `Genel: Bu PR iyi görünüyor! API yapısı temiz ve kurallarımıza uyuyor.

**Öneriler:**

1. **Güvenlik Endişesi (Satır 45):**
   Mevcut: [Ne yaptıkları]
   Sorun: [Neden sorun olduğu]
   Öneri: [Nasıl düzeltileceği]

2. **Hata Yönetimi (Satır 78):**
   Olası veritabanı hatalarını sorunsuzca ele almak için buraya try-catch bloğu eklemeyi düşünün.

3. **Küçük:** Satır 23'teki değişken adlandırması - netlik için \`uid\` yerine \`userId\` kullanmayı düşünün.

**Küçük Ayrıntılar (Nitpicks):**
- Ana fonksiyon için JSDoc yorumu eksik
- Doğrulama mantığı ayrı bir fonksiyona çıkarılabilir

Genel olarak harika iş! Sorularınız varsa bana bildirin.`,
            tips: [
                'Olumlu bir şeyle başlayın',
                'İşbirlikçi olmak için "sen/senin" yerine "biz/bizim" kullanın',
                'Geri bildirimi kategorize edin: Kritik, Öneriler, Küçük Ayrıntılar',
                'Yorumlarınızın arkasındaki mantığı açıklayın',
                'Karmaşık sorunlarda birlikte programlama teklif edin',
                'Düşün...", "Ne dersin...", "Öneri:" gibi ifadeler kullanın',
            ],
        },
        {
            id: 'tech-presentation',
            title: 'Teknik Sunum',
            icon: '📊',
            scenario: `Geliştirdiğiniz yeni bir özellik hakkında 5 dakikalık bir sunum hazırlayın.

**Özellik:** Gerçek zamanlı bildirim sistemi
**İzleyici:** Tüm mühendislik ekibi (25 kişi)
**Hedef:** Mimariyi ve başkalarının onu nasıl kullanabileceğini açıklayın`,
            template: `**Slayt 1: Başlık**
"Gerçek Zamanlı Bildirim Sistemi: Mimari ve Entegrasyon"

**Slayt 2: Sorun İfadesi**
"Önceden: Kullanıcılar güncellemeleri görmek için yenilemek zorundaydı
Şimdi: WebSockets kullanan anında bildirimler"

**Slayt 3: Mimari Genel Bakış**
- Frontend: WebSocket istemcisi
- Backend: Node.js WebSocket sunucusu
- Mesaj Kuyruğu: Ölçeklenebilirlik için Redis

**Slayt 4: Nasıl Entegre Edilir**
1. NotificationClient'ı içe aktarın
2. Kullanıcı kimlik bilgileriyle başlatın
3. Etkinliklere abone olun
4. Gelen mesajları işleyin

**Slayt 5: Demo**
[Canlı gösterim]

**Slayt 6: Soru ve Cevap (Q&A)**
"Sorular? Detaylı tartışmalar için daha sonra müsaitim"

**Konuşma Notları:**
- Başlayın: "Herkese günaydın, bugün sizlere sunacağım..."
- Geçişler: "Şuna geçersek...", "Şimdi şuna bir göz atalım...", "Şimdi size göstereceğim..."
- Kapanış: "Özetlemek gerekirse...", "Sonuç olarak...", "Vaktiniz için teşekkür ederim"`,
            tips: [
                'Net bir sorun ifadesiyle başlayın',
                'Basit bir dil kullanın, kısaltmaları ilk seferde açıklayın',
                'Mümkün olduğunda görsel diyagramlar gösterin',
                'Uygunsa canlı demolar ekleyin',
                'Sorular için zaman bırakın',
                'Teknik terimlerin telaffuzunu önceden pratik yapın',
                'Yavaş ve net konuşun - özellikle İngilizce ana diliniz değilse',
            ],
        },
    ]
};
