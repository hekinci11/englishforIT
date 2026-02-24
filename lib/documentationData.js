export const documentationSamples = {
    en: [
        {
            id: 'api-docs',
            title: 'API Documentation',
            icon: '📡',
            content: `# User Authentication API

## Overview
This API provides endpoints for user authentication including registration, login, and password reset functionality.

## Base URL
\`\`\`
https://api.example.com/v1
\`\`\`

## Authentication
All authenticated endpoints require a Bearer token in the Authorization header:
\`\`\`
Authorization: Bearer YOUR_ACCESS_TOKEN
\`\`\`

## Endpoints

### POST /auth/register
Creates a new user account.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
\`\`\`

**Response (201 Created):**
\`\`\`json
{
  "user": {
    "id": "usr_123",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
\`\`\``,
            questions: [
                {
                    question: 'What HTTP method is used to create a new user?',
                    options: ['GET', 'POST', 'PUT', 'DELETE'],
                    correct: 'POST',
                },
                {
                    question: 'What status code is returned on successful registration?',
                    options: ['200', '201', '204', '400'],
                    correct: '201',
                },
                {
                    question: 'Where should the access token be included?',
                    options: ['Query parameter', 'Request body', 'Authorization header', 'Cookie'],
                    correct: 'Authorization header',
                },
            ],
        },
        {
            id: 'readme',
            title: 'README Documentation',
            icon: '📖',
            content: `# Project Name

A modern web application built with Next.js and React for managing team workflows.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Git

## Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/username/project-name.git
cd project-name
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a \`.env.local\` file in the root directory:
\`\`\`env
DATABASE_URL=your_database_url
API_KEY=your_api_key
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

## Project Structure

\`\`\`
/app        - Next.js app router pages
/components - Reusable React components
/lib        - Utility functions and helpers
/public     - Static assets
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request`,
            questions: [
                {
                    question: 'What is the minimum required Node.js version?',
                    options: ['v14', 'v16', 'v18', 'v20'],
                    correct: 'v18',
                },
                {
                    question: 'What command starts the development server?',
                    options: ['npm start', 'npm dev', 'npm run dev', 'npm serve'],
                    correct: 'npm run dev',
                },
                {
                    question: 'Where should environment variables be stored?',
                    options: ['.env.local file', 'package.json', 'config.js', 'README.md'],
                    correct: '.env.local file',
                },
            ],
        },
    ],
    tr: [
        {
            id: 'api-docs',
            title: 'API Dokümantasyonu',
            icon: '📡',
            content: `# Kullanıcı Kimlik Doğrulama API'si

## Genel Bakış
Bu API, kayıt, giriş ve parola sıfırlama işlevleri dahil olmak üzere kullanıcı kimlik doğrulaması için uç noktalar sağlar.

## Temel URL
\`\`\`
https://api.example.com/v1
\`\`\`

## Kimlik Doğrulama
Kimliği doğrulanmış tüm uç noktalar, Authorization başlığında bir Bearer belirteci (token) gerektirir:
\`\`\`
Authorization: Bearer SİZİN_ERİŞİM_BELİRTECİNİZ
\`\`\`

## Uç Noktalar

### POST /auth/register
Yeni bir kullanıcı hesabı oluşturur.

**İstek Gövdesi:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "harikaSifre123",
  "name": "Ahmet Yılmaz"
}
\`\`\`

**Yanıt (201 Oluşturuldu):**
\`\`\`json
{
  "user": {
    "id": "usr_123",
    "email": "user@example.com",
    "name": "Ahmet Yılmaz"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
\`\`\``,
            questions: [
                {
                    question: 'Yeni bir kullanıcı oluşturmak için hangi HTTP metodu kullanılır?',
                    options: ['GET', 'POST', 'PUT', 'DELETE'],
                    correct: 'POST',
                },
                {
                    question: 'Başarılı kayıtta hangi durum kodu döndürülür?',
                    options: ['200', '201', '204', '400'],
                    correct: '201',
                },
                {
                    question: 'Erişim belirteci (access token) nereye eklenmelidir?',
                    options: ['Sorgu parametresi (Query parameter)', 'İstek gövdesi (Request body)', 'Authorization başlığı (header)', 'Çerez (Cookie)'],
                    correct: 'Authorization başlığı (header)',
                },
            ],
        },
        {
            id: 'readme',
            title: 'README Dokümantasyonu',
            icon: '📖',
            content: `# Proje Adı

Ekip iş akışlarını yönetmek için Next.js ve React ile oluşturulmuş modern bir web uygulaması.

## Ön Koşullar

Başlamadan önce, aşağıdakilerin kurulu olduğundan emin olun:
- Node.js (v18 veya üstü)
- npm veya yarn
- Git

## Kurulum

1. Depoyu (repository) klonlayın:
\`\`\`bash
git clone https://github.com/username/project-name.git
cd project-name
\`\`\`

2. Bağımlılıkları (dependencies) yükleyin:
\`\`\`bash
npm install
\`\`\`

3. Kök dizinde (root directory) bir \`.env.local\` dosyası oluşturun:
\`\`\`env
DATABASE_URL=sizin_veritabani_url_niz
API_KEY=sizin_api_anahtariniz
\`\`\`

4. Geliştirme sunucusunu çalıştırın:
\`\`\`bash
npm run dev
\`\`\`

## Proje Yapısı

\`\`\`
/app        - Next.js app router sayfaları
/components - Yeniden kullanılabilir React bileşenleri
/lib        - Yardımcı fonksiyonlar (Utility)
/public     - Statik varlıklar (Assets)
\`\`\`

## Katkıda Bulunma

1. Depoyu "Fork" yapın
2. Özellik (feature) dalınızı oluşturun (\`git checkout -b feature/harika-ozellik\`)
3. Değişikliklerinizi "Commit" yapın (\`git commit -m 'Harika bir özellik ekle'\`)
4. Dalınıza (branch) "Push" yapın (\`git push origin feature/harika-ozellik\`)
5. Bir "Pull Request" (Çekme İsteği) açın`,
            questions: [
                {
                    question: 'Gerekli minimum Node.js sürümü nedir?',
                    options: ['v14', 'v16', 'v18', 'v20'],
                    correct: 'v18',
                },
                {
                    question: 'Hangi komut geliştirme sunucusunu başlatır?',
                    options: ['npm start', 'npm dev', 'npm run dev', 'npm serve'],
                    correct: 'npm run dev',
                },
                {
                    question: 'Ortam değişkenleri (environment variables) nerede saklanmalıdır?',
                    options: ['.env.local dosyası', 'package.json', 'config.js', 'README.md'],
                    correct: '.env.local dosyası',
                },
            ],
        },
    ]
};
