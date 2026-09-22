<?php
/**
 * Gloma International - Unified Server-Side API Router (MySQL + Telegram)
 * Built for ServerByte (StackCP) Apache / PHP with native MySQL, CORS, and Telegram alerts.
 */

// 1. Set Full CORS and Security Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin');
header('Access-Control-Max-Age: 86400');
header('Content-Type: application/json; charset=UTF-8');

// Respond immediately to OPTIONS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 2. Load Environment Variables from .env file if available
function loadEnv($file) {
    if (!file_exists($file)) return;
    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || strpos($line, '#') === 0) continue;
        if (strpos($line, '=') !== false) {
            list($name, $value) = explode('=', $line, 2);
            $name = trim($name);
            $value = trim($value, " \t\n\r\0\x0B\"'");
            if (!getenv($name)) {
                putenv("$name=$value");
                $_ENV[$name] = $value;
            }
        }
    }
}

loadEnv(__DIR__ . '/.env');
loadEnv(__DIR__ . '/../.env');
loadEnv(dirname(__DIR__, 2) . '/.env');

function env($key, $default = '') {
    $val = getenv($key);
    if ($val !== false && $val !== '') return $val;
    if (isset($_ENV[$key]) && $_ENV[$key] !== '') return $_ENV[$key];
    return $default;
}

// 3. MySQL Database Connection via PDO
function getDb() {
    static $pdo = null;
    if ($pdo !== null) return $pdo;

    $host = env('DB_HOST', 'localhost');
    $name = env('DB_NAME', '');
    $user = env('DB_USER', '');
    $pass = env('DB_PASS', '');
    $port = env('DB_PORT', '3306');

    if (empty($name) || empty($user)) {
        return null; // DB credentials not provided, fall back gracefully
    }

    try {
        $dsn = "mysql:host={$host};port={$port};dbname={$name};charset=utf8mb4";
        $pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_TIMEOUT => 5,
        ]);
        initDatabaseTables($pdo);
        return $pdo;
    } catch (PDOException $e) {
        error_log("Database connection failed: " . $e->getMessage());
        return null;
    }
}

// Auto-create tables on first run if they don't exist
function initDatabaseTables(PDO $pdo) {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `leads` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `name` VARCHAR(255) NOT NULL,
            `email` VARCHAR(255) NOT NULL,
            `phone` VARCHAR(100) NULL,
            `service` VARCHAR(255) NULL,
            `message` TEXT NOT NULL,
            `status` VARCHAR(50) DEFAULT 'new',
            `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS `services` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `title` VARCHAR(255) NOT NULL,
            `text` TEXT NOT NULL,
            `items` TEXT NULL,
            `icon_key` VARCHAR(100) NOT NULL,
            `sort_order` INT DEFAULT 0,
            `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS `works` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `category` VARCHAR(100) NOT NULL,
            `cat_label` VARCHAR(100) NOT NULL,
            `title` VARCHAR(255) NOT NULL,
            `link` VARCHAR(500) NULL,
            `img` VARCHAR(500) NULL,
            `sort_order` INT DEFAULT 0,
            `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS `reviews` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `quote` TEXT NOT NULL,
            `name` VARCHAR(255) NOT NULL,
            `role` VARCHAR(255) NOT NULL,
            `sort_order` INT DEFAULT 0,
            `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    // Auto-seed if empty
    $countServices = (int)$pdo->query("SELECT COUNT(*) FROM `services`")->fetchColumn();
    if ($countServices === 0) {
        global $DEFAULT_SERVICES;
        $stmt = $pdo->prepare("INSERT INTO `services` (`title`, `text`, `items`, `icon_key`, `sort_order`) VALUES (?, ?, ?, ?, ?)");
        foreach ($DEFAULT_SERVICES as $s) {
            $stmt->execute([$s['title'], $s['text'], json_encode($s['items']), $s['icon_key'], $s['sort_order']]);
        }
    }

    $countWorks = (int)$pdo->query("SELECT COUNT(*) FROM `works`")->fetchColumn();
    if ($countWorks === 0) {
        global $DEFAULT_WORKS;
        $stmt = $pdo->prepare("INSERT INTO `works` (`category`, `cat_label`, `title`, `link`, `img`, `sort_order`) VALUES (?, ?, ?, ?, ?, ?)");
        foreach ($DEFAULT_WORKS as $w) {
            $stmt->execute([$w['category'], $w['cat_label'], $w['title'], $w['link'], $w['img'], $w['sort_order']]);
        }
    }

    $countReviews = (int)$pdo->query("SELECT COUNT(*) FROM `reviews`")->fetchColumn();
    if ($countReviews === 0) {
        global $DEFAULT_REVIEWS;
        $stmt = $pdo->prepare("INSERT INTO `reviews` (`quote`, `name`, `role`, `sort_order`) VALUES (?, ?, ?, ?)");
        foreach ($DEFAULT_REVIEWS as $r) {
            $stmt->execute([$r['quote'], $r['name'], $r['role'], $r['sort_order']]);
        }
    }
}

// 4. Default Seed Data (In-memory fallback if MySQL not yet configured)
$DEFAULT_SERVICES = [
    ['id' => '1', 'title' => 'Web Development', 'text' => 'Custom, responsive websites and web apps engineered for speed, SEO, and conversions — from landing pages to full platforms.', 'items' => ['Business & e-commerce websites', 'Custom web applications', 'Website maintenance & support', 'Speed & SEO optimization'], 'icon_key' => 'web', 'sort_order' => 0],
    ['id' => '2', 'title' => 'Social Media Handling', 'text' => 'End-to-end management of your social channels — strategy, content calendars, posting, and community engagement.', 'items' => ['Platform strategy & growth', 'Content scheduling & posting', 'Community management', 'Performance reporting'], 'icon_key' => 'social', 'sort_order' => 1],
    ['id' => '3', 'title' => 'Content Creation', 'text' => 'Scroll-stopping graphics, video, photography and copywriting tailored to every platform and audience.', 'items' => ['Graphic design & video editing', 'Copywriting & captions', 'Photography direction', 'Campaign content kits'], 'icon_key' => 'content', 'sort_order' => 2],
    ['id' => '4', 'title' => 'IT Solutions', 'text' => 'Dependable technical infrastructure, systems setup, and support to keep your business running smoothly.', 'items' => ['Network & systems setup', 'Cloud & infrastructure support', 'Technical consulting', 'Ongoing IT support'], 'icon_key' => 'it', 'sort_order' => 3],
    ['id' => '5', 'title' => 'Advertising & Branding', 'text' => 'Brand identities and ad campaigns built to make a lasting impression and drive measurable results.', 'items' => ['Brand identity & guidelines', 'Logo & visual systems', 'Paid ad campaigns', 'Market positioning'], 'icon_key' => 'branding', 'sort_order' => 4],
    ['id' => '6', 'title' => 'Mobile Apps', 'text' => 'Native and cross-platform mobile applications designed for performance, usability, and scale.', 'items' => ['iOS & Android development', 'Cross-platform apps', 'UI/UX for mobile', 'App maintenance & updates'], 'icon_key' => 'mobile', 'sort_order' => 5],
];

$DEFAULT_WORKS = [
    ['id' => '1', 'category' => 'web', 'cat_label' => 'Web Development', 'title' => 'Magic Mirror Art', 'link' => 'https://magic-mirror-art.lovable.app', 'img' => null, 'sort_order' => 0],
    ['id' => '2', 'category' => 'web', 'cat_label' => 'Web Development', 'title' => 'Renua Medspa', 'link' => 'https://renuamedspa.com/', 'img' => null, 'sort_order' => 1],
    ['id' => '3', 'category' => 'web', 'cat_label' => 'Web Development', 'title' => 'Novalys Capital', 'link' => 'https://novalyscapital.ca/', 'img' => null, 'sort_order' => 2],
    ['id' => '4', 'category' => 'branding', 'cat_label' => 'Branding', 'title' => 'Pettah Mall', 'link' => 'https://pettahmall.com/', 'img' => null, 'sort_order' => 3],
    ['id' => '5', 'category' => 'branding', 'cat_label' => 'Branding', 'title' => 'Biz Online', 'link' => 'https://www.bizonline.lk/', 'img' => null, 'sort_order' => 4],
    ['id' => '6', 'category' => 'branding', 'cat_label' => 'Branding', 'title' => 'Smart Time', 'link' => 'https://smarttime.lk/', 'img' => null, 'sort_order' => 5],
    ['id' => '7', 'category' => 'social', 'cat_label' => 'Social Media', 'title' => "Russel's Tea Services and Catering", 'link' => 'https://www.facebook.com/russelscatering', 'img' => '/assets/russels-catering.png', 'sort_order' => 6],
    ['id' => '8', 'category' => 'social', 'cat_label' => 'Social Media', 'title' => "Russel's Dimbula Tea", 'link' => 'https://www.facebook.com/profile.php?id=61589278528562', 'img' => '/assets/russels-dimbula-tea.jpg', 'sort_order' => 7],
    ['id' => '9', 'category' => 'social', 'cat_label' => 'Social Media', 'title' => 'Russel Francis Perera', 'link' => 'https://www.facebook.com/profile.php?id=61586921127253', 'img' => '/assets/russel-perera.jpg', 'sort_order' => 8],
    ['id' => '10', 'category' => 'social', 'cat_label' => 'Social Media', 'title' => 'Premasiri Gamage Consultant', 'link' => 'https://www.facebook.com/profile.php?id=61577673075763', 'img' => '/assets/premasiri-gamage.png', 'sort_order' => 9],
];

$DEFAULT_REVIEWS = [
    ['id' => '1', 'quote' => 'Gloma International transformed our online presence. Their creativity and professionalism are unmatched.', 'name' => 'Amina Yusuf', 'role' => 'Founder, Velosea', 'sort_order' => 0],
    ['id' => '2', 'quote' => 'The team delivered a stunning app experience. Communication was smooth from start to finish.', 'name' => 'David Okoro', 'role' => 'CEO, Groceria', 'sort_order' => 1],
    ['id' => '3', 'quote' => 'Highly recommended. They understand branding and how it connects with an audience.', 'name' => 'Sara Bello', 'role' => 'Marketing Lead, Zenara', 'sort_order' => 2],
    ['id' => '4', 'quote' => 'Our social channels finally feel consistent and on-brand. Engagement has nearly doubled since we started.', 'name' => 'Michael Chen', 'role' => 'Founder, Fitverse', 'sort_order' => 3],
    ['id' => '5', 'quote' => 'Their IT support has been rock solid. Fast response times and they actually explain things clearly.', 'name' => 'Lara Mensah', 'role' => 'Ops Manager, Summit Logistics', 'sort_order' => 4],
    ['id' => '6', 'quote' => 'From packaging to launch campaign, Gloma nailed the whole brand rollout. Couldn\'t be happier.', 'name' => 'Ryan Castillo', 'role' => 'Co-Founder, Revise', 'sort_order' => 5],
    ['id' => '7', 'quote' => 'They redesigned our website in three weeks and conversions jumped almost immediately. Worth every rupee.', 'name' => 'Nadia Perera', 'role' => 'Director, Ceylon Bloom', 'sort_order' => 6],
    ['id' => '8', 'quote' => 'Professional, punctual and genuinely invested in our growth. It feels like an in-house team.', 'name' => 'Tom Becker', 'role' => 'GM, Harbourline Foods', 'sort_order' => 7],
    ['id' => '9', 'quote' => 'The ad campaigns they run for us consistently outperform anything we tried before. Clear reporting too.', 'name' => 'Ishara Fernando', 'role' => 'Owner, Lumen Interiors', 'sort_order' => 8],
    ['id' => '10', 'quote' => 'Great eye for detail. Our brand finally looks the way we always imagined it.', 'name' => 'Priya Raman', 'role' => 'Founder, Kindred Kids', 'sort_order' => 9],
    ['id' => '11', 'quote' => 'Fast, friendly and full of ideas. Every meeting ends with something actionable.', 'name' => 'Jonas Weber', 'role' => 'CMO, Trailhead Gear', 'sort_order' => 10],
    ['id' => '12', 'quote' => 'They took over our video content and views tripled in two months. The strategy just works.', 'name' => 'Aisha Khan', 'role' => 'Creator, DailyBite', 'sort_order' => 11],
];

// 5. Parse Route
$uri = $_SERVER['REQUEST_URI'] ?? '/';
$path = parse_url($uri, PHP_URL_PATH);
$route = preg_replace('#^/?api/#', '', $path);
$route = trim($route, '/');
if (empty($route) && isset($_GET['route'])) {
    $route = trim($_GET['route'], '/');
}

$method = $_SERVER['REQUEST_METHOD'];
$bodyJson = file_get_contents('php://input');
$body = json_decode($bodyJson, true) ?: [];
$pdo = getDb();

// 6. Route Dispatcher
switch ($route) {
    case 'contact':
        if ($method !== 'POST') {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            exit;
        }

        $name = trim($body['name'] ?? '');
        $email = trim($body['email'] ?? '');
        $phone = trim($body['phone'] ?? '');
        $service = trim($body['service'] ?? '');
        $message = trim($body['message'] ?? '');

        if (!$name || !$email || !$message) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            exit;
        }

        // Save to MySQL database if available
        if ($pdo) {
            try {
                $stmt = $pdo->prepare("INSERT INTO `leads` (`name`, `email`, `phone`, `service`, `message`, `status`) VALUES (?, ?, ?, ?, ?, 'new')");
                $stmt->execute([$name, $email, $phone ?: null, $service ?: null, $message]);
            } catch (Exception $e) {
                error_log("Failed to insert lead into MySQL: " . $e->getMessage());
            }
        }

        // Send Telegram alert if token and chat ID are provided
        $token = env('TELEGRAM_BOT_TOKEN');
        $chatId = env('TELEGRAM_CHAT_ID');
        $notified = false;

        if ($token && $chatId) {
            $text = "📬 *New Website Lead*\n\n*Name:* {$name}\n*Email:* {$email}\n*Phone:* " . ($phone ?: 'N/A') . "\n*Project Type:* " . ($service ?: 'N/A') . "\n\n*Message:*\n{$message}";
            $tgUrl = "https://api.telegram.org/bot{$token}/sendMessage";
            $tgData = json_encode(['chat_id' => $chatId, 'text' => $text, 'parse_mode' => 'Markdown']);

            $ch = curl_init($tgUrl);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $tgData);
            curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
            curl_setopt($ch, CURLOPT_TIMEOUT, 6);
            curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            $notified = ($httpCode >= 200 && $httpCode < 300);
        }

        echo json_encode(['ok' => true, 'notified' => $notified]);
        exit;

    case 'services':
        if ($method === 'GET') {
            if ($pdo) {
                $stmt = $pdo->query("SELECT * FROM `services` ORDER BY `sort_order` ASC, `id` ASC");
                $rows = $stmt->fetchAll();
                foreach ($rows as &$r) {
                    $r['items'] = json_decode($r['items'] ?? '[]', true) ?: [];
                }
                echo json_encode(['services' => $rows]);
                exit;
            }
            echo json_encode(['services' => $DEFAULT_SERVICES]);
            exit;
        }

        if ($method === 'POST') {
            if ($pdo) {
                $stmt = $pdo->prepare("INSERT INTO `services` (`title`, `text`, `items`, `icon_key`, `sort_order`) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([$body['title'] ?? '', $body['text'] ?? '', json_encode($body['items'] ?? []), $body['icon_key'] ?? '', (int)($body['sort_order'] ?? 0)]);
                $id = $pdo->lastInsertId();
                echo json_encode(['service' => array_merge(['id' => $id], $body)]);
                exit;
            }
            echo json_encode(['service' => $body]);
            exit;
        }

        if ($method === 'PUT') {
            $id = $body['id'] ?? 0;
            if ($pdo && $id) {
                $stmt = $pdo->prepare("UPDATE `services` SET `title` = ?, `text` = ?, `items` = ?, `icon_key` = ?, `sort_order` = ? WHERE `id` = ?");
                $stmt->execute([$body['title'] ?? '', $body['text'] ?? '', json_encode($body['items'] ?? []), $body['icon_key'] ?? '', (int)($body['sort_order'] ?? 0), $id]);
            }
            echo json_encode(['service' => $body]);
            exit;
        }

        if ($method === 'DELETE') {
            $id = $body['id'] ?? 0;
            if ($pdo && $id) {
                $stmt = $pdo->prepare("DELETE FROM `services` WHERE `id` = ?");
                $stmt->execute([$id]);
            }
            echo json_encode(['ok' => true]);
            exit;
        }
        break;

    case 'works':
        if ($method === 'GET') {
            if ($pdo) {
                $stmt = $pdo->query("SELECT * FROM `works` ORDER BY `sort_order` ASC, `id` ASC");
                echo json_encode(['works' => $stmt->fetchAll()]);
                exit;
            }
            echo json_encode(['works' => $DEFAULT_WORKS]);
            exit;
        }

        if ($method === 'POST') {
            if ($pdo) {
                $stmt = $pdo->prepare("INSERT INTO `works` (`category`, `cat_label`, `title`, `link`, `img`, `sort_order`) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt->execute([$body['category'] ?? '', $body['cat_label'] ?? '', $body['title'] ?? '', $body['link'] ?? null, $body['img'] ?? null, (int)($body['sort_order'] ?? 0)]);
                $id = $pdo->lastInsertId();
                echo json_encode(['work' => array_merge(['id' => $id], $body)]);
                exit;
            }
            echo json_encode(['work' => $body]);
            exit;
        }

        if ($method === 'PUT') {
            $id = $body['id'] ?? 0;
            if ($pdo && $id) {
                $stmt = $pdo->prepare("UPDATE `works` SET `category` = ?, `cat_label` = ?, `title` = ?, `link` = ?, `img` = ?, `sort_order` = ? WHERE `id` = ?");
                $stmt->execute([$body['category'] ?? '', $body['cat_label'] ?? '', $body['title'] ?? '', $body['link'] ?? null, $body['img'] ?? null, (int)($body['sort_order'] ?? 0), $id]);
            }
            echo json_encode(['work' => $body]);
            exit;
        }

        if ($method === 'DELETE') {
            $id = $body['id'] ?? 0;
            if ($pdo && $id) {
                $stmt = $pdo->prepare("DELETE FROM `works` WHERE `id` = ?");
                $stmt->execute([$id]);
            }
            echo json_encode(['ok' => true]);
            exit;
        }
        break;

    case 'reviews':
        if ($method === 'GET') {
            if ($pdo) {
                $stmt = $pdo->query("SELECT * FROM `reviews` ORDER BY `sort_order` ASC, `id` ASC");
                echo json_encode(['reviews' => $stmt->fetchAll()]);
                exit;
            }
            echo json_encode(['reviews' => $DEFAULT_REVIEWS]);
            exit;
        }

        if ($method === 'POST') {
            if ($pdo) {
                $stmt = $pdo->prepare("INSERT INTO `reviews` (`quote`, `name`, `role`, `sort_order`) VALUES (?, ?, ?, ?)");
                $stmt->execute([$body['quote'] ?? '', $body['name'] ?? '', $body['role'] ?? '', (int)($body['sort_order'] ?? 0)]);
                $id = $pdo->lastInsertId();
                echo json_encode(['review' => array_merge(['id' => $id], $body)]);
                exit;
            }
            echo json_encode(['review' => $body]);
            exit;
        }

        if ($method === 'PUT') {
            $id = $body['id'] ?? 0;
            if ($pdo && $id) {
                $stmt = $pdo->prepare("UPDATE `reviews` SET `quote` = ?, `name` = ?, `role` = ?, `sort_order` = ? WHERE `id` = ?");
                $stmt->execute([$body['quote'] ?? '', $body['name'] ?? '', $body['role'] ?? '', (int)($body['sort_order'] ?? 0), $id]);
            }
            echo json_encode(['review' => $body]);
            exit;
        }

        if ($method === 'DELETE') {
            $id = $body['id'] ?? 0;
            if ($pdo && $id) {
                $stmt = $pdo->prepare("DELETE FROM `reviews` WHERE `id` = ?");
                $stmt->execute([$id]);
            }
            echo json_encode(['ok' => true]);
            exit;
        }
        break;

    case 'admin/leads':
        if ($method === 'GET') {
            if ($pdo) {
                $stmt = $pdo->query("SELECT * FROM `leads` ORDER BY `created_at` DESC, `id` DESC");
                echo json_encode(['leads' => $stmt->fetchAll()]);
                exit;
            }
            echo json_encode(['leads' => []]);
            exit;
        }

        if ($method === 'PUT') {
            $id = $body['id'] ?? 0;
            $status = $body['status'] ?? 'new';
            if ($pdo && $id) {
                $stmt = $pdo->prepare("UPDATE `leads` SET `status` = ? WHERE `id` = ?");
                $stmt->execute([$status, $id]);
            }
            echo json_encode(['lead' => $body]);
            exit;
        }

        if ($method === 'DELETE') {
            $id = $body['id'] ?? 0;
            if ($pdo && $id) {
                $stmt = $pdo->prepare("DELETE FROM `leads` WHERE `id` = ?");
                $stmt->execute([$id]);
            }
            echo json_encode(['ok' => true]);
            exit;
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Not found', 'route' => $route]);
        exit;
}
