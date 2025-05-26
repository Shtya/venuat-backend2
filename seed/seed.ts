
/*
! countries 
INSERT INTO countries (name) VALUES ('Egypt'), ('Saudi Arabia'), ('United Arab Emirates'), ('Qatar'), ('Kuwait'), ('Bahrain'), ('Oman'), ('Lebanon'), ('Jordan'), ('Morocco'), ('Tunisia'), ('Algeria'), ('Sudan'), ('Turkey'), ('France'), ('United Kingdom'), ('United States'), ('Canada'), ('Germany'), ('Italy');

! cities
INSERT INTO city (name, country_id) VALUES ('Riyadh', 2), ('Jeddah', 2), ('Mecca', 2), ('Medina', 2), ('Dammam', 2), ('Khobar', 2), ('Taif', 2), ('Tabuk', 2), ('Abha', 2), ('Hail', 2), ('Najran', 2), ('Jizan', 2), ('Al Kharj', 2), ('Yanbu', 2), ('Al Bahah', 2), ('Qassim', 2), ('Sakaka', 2), ('Arar', 2), ('Hofuf', 2), ('Rafha', 2); 

! properties

INSERT INTO property (vendor_id, city_id, name, description, file) VALUES
(1, 3, '{"en": "Luxury Villa", "ar": "فيلا فاخرة"}',  '{"en": "A beautiful villa with modern amenities and stunning views.", "ar": "فيلا جميلة مع وسائل الراحة الحديثة وإطلالات رائعة."}', 'https://picsum.photos/300/200?random=1'),
(2, 7, '{"en": "Modern Apartment", "ar": "شقة حديثة"}',  '{"en": "Spacious apartment with city skyline views.", "ar": "شقة واسعة مع إطلالة على أفق المدينة."}', 'https://picsum.photos/300/200?random=2'),
(4, 12, '{"en": "Cozy Cottage", "ar": "كوخ دافئ"}',  '{"en": "A peaceful retreat in a quiet area.", "ar": "ملاذ هادئ في منطقة هادئة."}', 'https://picsum.photos/300/200?random=3'),
(4, 15, '{"en": "Beach House", "ar": "منزل على الشاطئ"}',  '{"en": "Perfect house for summer vacations.", "ar": "منزل مثالي لقضاء العطلات الصيفية."}', 'https://picsum.photos/300/200?random=4'),
(5, 9, '{"en": "Penthouse Suite", "ar": "جناح بنتهاوس"}',  '{"en": "A high-end penthouse with luxury interiors.", "ar": "جناح فاخر بتصميم داخلي أنيق."}', 'https://picsum.photos/300/200?random=5'),
(6, 2, '{"en": "Desert Resort", "ar": "منتجع صحراوي"}',  '{"en": "Escape to a peaceful desert oasis.", "ar": "اهرب إلى واحة صحراوية هادئة."}', 'https://picsum.photos/300/200?random=6'),
(7, 18, '{"en": "Mountain Cabin", "ar": "كوخ جبلي"}',  '{"en": "A wooden cabin with breathtaking mountain views.", "ar": "كوخ خشبي بإطلالة رائعة على الجبال."}', 'https://picsum.photos/300/200?random=7'),
(1, 6, '{"en": "Royal Palace", "ar": "قصر ملكي"}',  '{"en": "A grand palace fit for royalty.", "ar": "قصر فاخر يناسب العائلة المالكة."}', 'https://picsum.photos/300/200?random=8'),
(4, 11, '{"en": "Countryside Farmhouse", "ar": "مزرعة ريفية"}',  '{"en": "A traditional farmhouse with vast fields.", "ar": "مزرعة تقليدية مع حقول واسعة."}', 'https://picsum.photos/300/200?random=9'),
(5, 14, '{"en": "Skyline Tower", "ar": "برج الأفق"}',  '{"en": "A luxury high-rise apartment in the city center.", "ar": "شقة فاخرة في وسط المدينة."}', 'https://picsum.photos/300/200?random=10'),
(2, 8, '{"en": "Lake House", "ar": "منزل البحيرة"}',  '{"en": "A serene house by the lake with stunning views.", "ar": "منزل هادئ بجانب البحيرة مع مناظر رائعة."}', 'https://picsum.photos/300/200?random=11'),
(4, 16, '{"en": "Elegant Mansion", "ar": "قصر أنيق"}',  '{"en": "A luxurious mansion with private gardens.", "ar": "قصر فاخر مع حدائق خاصة."}', 'https://picsum.photos/300/200?random=12'),
(6, 10, '{"en": "Modern Loft", "ar": "شقة دور علوي حديثة"}',  '{"en": "An industrial-style loft with open spaces.", "ar": "شقة دور علوي على الطراز الصناعي مع مساحات مفتوحة."}', 'https://picsum.photos/300/200?random=13'),
(7, 5, '{"en": "Private Villa", "ar": "فيلا خاصة"}',  '{"en": "A private villa with a large swimming pool.", "ar": "فيلا خاصة مع مسبح كبير."}', 'https://picsum.photos/300/200?random=14'),
(4, 13, '{"en": "Seaside Retreat", "ar": "منتجع ساحلي"}',  '{"en": "A beachfront property with direct ocean access.", "ar": "عقار على الشاطئ مع وصول مباشر إلى المحيط."}', 'https://picsum.photos/300/200?random=15'),
(1, 19, '{"en": "Urban Studio", "ar": "استوديو حضري"}',  '{"en": "A stylish studio apartment in the heart of the city.", "ar": "شقة استوديو أنيقة في قلب المدينة."}', 'https://picsum.photos/300/200?random=16'),
(5, 17, '{"en": "Boutique Hotel", "ar": "فندق بوتيك"}',  '{"en": "A charming boutique hotel with personalized service.", "ar": "فندق بوتيك ساحر مع خدمة شخصية."}', 'https://picsum.photos/300/200?random=17'),
(4, 1, '{"en": "Historical House", "ar": "منزل تاريخي"}',  '{"en": "A beautifully preserved historical home.", "ar": "منزل تاريخي محفوظ بشكل جميل."}', 'https://picsum.photos/300/200?random=18'),
(2, 20, '{"en": "Eco-Friendly Lodge", "ar": "نزل صديق للبيئة"}',  '{"en": "A sustainable lodge in a green environment.", "ar": "نزل مستدام في بيئة خضراء."}', 'https://picsum.photos/300/200?random=19'),
(6, 4, '{"en": "Luxury Tent", "ar": "خيمة فاخرة"}',  '{"en": "A five-star camping experience in nature.", "ar": "تجربة تخييم فاخرة من فئة الخمس نجوم في الطبيعة."}', 'https://picsum.photos/300/200?random=20'),
(7, 9, '{"en": "City Condo", "ar": "شقة سكنية"}',  '{"en": "A comfortable condo in a prime location.", "ar": "شقة مريحة في موقع متميز."}', 'https://picsum.photos/300/200?random=21'),
(4, 7, '{"en": "Rustic Barn", "ar": "حظيرة ريفية"}',  '{"en": "A countryside barn converted into a home.", "ar": "حظيرة ريفية تم تحويلها إلى منزل."}', 'https://picsum.photos/300/200?random=22'),
(1, 18, '{"en": "Traditional Riyadh House", "ar": "بيت رياض تقليدي"}',  '{"en": "A heritage home showcasing traditional Saudi architecture.", "ar": "منزل تراثي يعرض العمارة التقليدية في السعودية."}', 'https://picsum.photos/300/200?random=23'),
(5, 6, '{"en": "Modern Duplex", "ar": "دوبلكس حديث"}',  '{"en": "A spacious duplex with sleek interiors.", "ar": "دوبلكس واسع بتصميم داخلي أنيق."}', 'https://picsum.photos/300/200?random=24'),
(2, 11, '{"en": "Castle Estate", "ar": "عقار القلعة"}',  '{"en": "A grand estate with castle-like architecture.", "ar": "عقار فخم بتصميم يشبه القلعة."}', 'https://picsum.photos/300/200?random=25');



! occasion 
INSERT INTO occasion_type (name, created_at, updated_at) VALUES
('{"ar": "مناسبة زفاف", "en": "Wedding Celebration"}', NOW(), NOW()),
('{"ar": "حفل عيد ميلاد", "en": "Birthday Party"}', NOW(), NOW()),
('{"ar": "حفل تخرج", "en": "Graduation Ceremony"}', NOW(), NOW()),
('{"ar": "حفل خطوبة", "en": "Engagement Party"}', NOW(), NOW()),
('{"ar": "حفل استقبال مولود", "en": "Baby Shower"}', NOW(), NOW()),
('{"ar": "ذكرى سنوية", "en": "Anniversary"}', NOW(), NOW()),
('{"ar": "مؤتمر عمل", "en": "Business Conference"}', NOW(), NOW()),
('{"ar": "معرض فني", "en": "Art Exhibition"}', NOW(), NOW()),
('{"ar": "حفل افتتاح", "en": "Grand Opening"}', NOW(), NOW()),
('{"ar": "حفل موسيقي", "en": "Music Concert"}', NOW(), NOW()),
('{"ar": "ورشة عمل", "en": "Workshop"}', NOW(), NOW()),
('{"ar": "ندوة ثقافية", "en": "Cultural Seminar"}', NOW(), NOW()),
('{"ar": "مهرجان طعام", "en": "Food Festival"}', NOW(), NOW()),
('{"ar": "حفل خيري", "en": "Charity Event"}', NOW(), NOW()),
('{"ar": "مسابقة رياضية", "en": "Sports Competition"}', NOW(), NOW());


! Equipments
	INSERT INTO equipment (name, icon_media_id, is_predefined, created_at, updated_at) VALUES
	('{"en": "Projector", "ar": "جهاز عرض"}', 1, true, NOW(), NOW()),
	('{"en": "Microphone", "ar": "ميكروفون"}', 1, true, NOW(), NOW()),
	('{"en": "Sound System", "ar": "نظام صوتي"}', 1, true, NOW(), NOW()),
	('{"en": "Stage Lighting", "ar": "إضاءة المسرح"}', 1, true, NOW(), NOW()),
	('{"en": "Whiteboard", "ar": "سبورة بيضاء"}', 1, true, NOW(), NOW()),
	('{"en": "Podium", "ar": "منصة محاضرات"}', 1, true, NOW(), NOW()),
	('{"en": "Conference Table", "ar": "طاولة اجتماعات"}', 1, true, NOW(), NOW()),
	('{"en": "WiFi Access", "ar": "اتصال واي فاي"}', 1, true, NOW(), NOW()),
	('{"en": "LCD TV", "ar": "تلفاز LCD"}', 1, true, NOW(), NOW()),
	('{"en": "Coffee Machine", "ar": "آلة صنع القهوة"}', 1, true, NOW(), NOW());


! Services 
INSERT INTO services (name, created_at, updated_at) VALUES
('{"ar": "تنسيق زهور", "en": "Flower Arrangement"}', NOW(), NOW()),
('{"ar": "تصوير فوتوغرافي", "en": "Photography"}', NOW(), NOW()),
('{"ar": "تصوير فيديو", "en": "Videography"}', NOW(), NOW()),
('{"ar": "تأجير سيارات فاخرة", "en": "Luxury Car Rental"}', NOW(), NOW()),
('{"ar": "تزيين القاعات", "en": "Venue Decoration"}', NOW(), NOW()),
('{"ar": "إضاءة احترافية", "en": "Professional Lighting"}', NOW(), NOW()),
('{"ar": "تقديم الطعام", "en": "Catering"}', NOW(), NOW()),
('{"ar": "موسيقى حية", "en": "Live Music"}', NOW(), NOW()),
('{"ar": "تنظيم حفلات", "en": "Event Planning"}', NOW(), NOW()),
('{"ar": "تنسيق دعوات", "en": "Invitation Design"}', NOW(), NOW()),
('{"ar": "خدمات استقبال الضيوف", "en": "Guest Reception"}', NOW(), NOW()),
('{"ar": "دي جي", "en": "DJ Services"}', NOW(), NOW()),
('{"ar": "إعداد المسرح", "en": "Stage Setup"}', NOW(), NOW()),
('{"ar": "تصميم كعكة الحفل", "en": "Cake Design"}', NOW(), NOW()),
('{"ar": "تنسيق المقاعد والطاولات", "en": "Seating Arrangement"}', NOW(), NOW());


! Plicies 

INSERT INTO policy (name, description, created_at, updated_at) VALUES
('{"en": "Cancellation Policy", "ar": "سياسة الإلغاء"}',  '{"en": "Bookings can be canceled up to 48 hours before the event.", "ar": "يمكن إلغاء الحجوزات قبل 48 ساعة من الحدث."}', NOW(), NOW()),
('{"en": "Refund Policy", "ar": "سياسة الاسترداد"}',  '{"en": "Refunds will be processed within 7 business days.", "ar": "سيتم معالجة عمليات الاسترداد خلال 7 أيام عمل."}', NOW(), NOW()),
('{"en": "Damage Liability", "ar": "مسؤولية الأضرار"}',  '{"en": "Guests are responsible for any damages incurred.", "ar": "الضيوف مسؤولون عن أي أضرار تحدث."}', NOW(), NOW()),
('{"en": "Noise Restrictions", "ar": "قيود الضوضاء"}',  '{"en": "Loud music is not allowed after 11 PM.", "ar": "لا يُسمح بالموسيقى الصاخبة بعد الساعة 11 مساءً."}', NOW(), NOW()),
('{"en": "Guest Capacity", "ar": "سعة الضيوف"}',  '{"en": "The venue can accommodate up to 200 guests.", "ar": "يمكن للمكان استيعاب ما يصل إلى 200 ضيف."}', NOW(), NOW()),
('{"en": "Smoking Policy", "ar": "سياسة التدخين"}',  '{"en": "Smoking is allowed only in designated areas.", "ar": "التدخين مسموح فقط في المناطق المخصصة."}', NOW(), NOW()),
('{"en": "Payment Terms", "ar": "شروط الدفع"}',  '{"en": "Full payment must be made at least 3 days before the event.", "ar": "يجب دفع المبلغ بالكامل قبل 3 أيام على الأقل من الحدث."}', NOW(), NOW()),
('{"en": "Alcohol Policy", "ar": "سياسة الكحول"}',  '{"en": "Alcohol is allowed only with prior approval.", "ar": "يُسمح بالكحول فقط بعد الحصول على موافقة مسبقة."}', NOW(), NOW()),
('{"en": "Decoration Guidelines", "ar": "إرشادات الديكور"}',  '{"en": "No nails or adhesives are allowed on the walls.", "ar": "لا يُسمح باستخدام المسامير أو المواد اللاصقة على الجدران."}', NOW(), NOW()),
('{"en": "Security Measures", "ar": "إجراءات الأمان"}',  '{"en": "Security personnel will be present at all times.", "ar": "سيكون هناك أفراد أمن متواجدون في جميع الأوقات."}', NOW(), NOW()),
('{"en": "Children Policy", "ar": "سياسة الأطفال"}',  '{"en": "Children must be supervised at all times.", "ar": "يجب الإشراف على الأطفال في جميع الأوقات."}', NOW(), NOW()),
('{"en": "Pet Policy", "ar": "سياسة الحيوانات الأليفة"}',  '{"en": "Only service animals are allowed.", "ar": "يُسمح فقط بالحيوانات المدربة لخدمة ذوي الاحتياجات الخاصة."}', NOW(), NOW()),
('{"en": "Emergency Procedures", "ar": "إجراءات الطوارئ"}',  '{"en": "Emergency exits are clearly marked.", "ar": "يتم وضع علامات واضحة على مخارج الطوارئ."}', NOW(), NOW()),
('{"en": "Check-in and Check-out", "ar": "إجراءات الدخول والمغادرة"}',  '{"en": "Check-in starts at 2 PM, and check-out is at 12 PM.", "ar": "يبدأ تسجيل الوصول في الساعة 2 مساءً، وتسجيل المغادرة في الساعة 12 ظهرًا."}', NOW(), NOW()),
('{"en": "Insurance Requirements", "ar": "متطلبات التأمين"}',  '{"en": "Event insurance is required for large gatherings.", "ar": "يُطلب تأمين الحدث للتجمعات الكبيرة."}', NOW(), NOW());


! Gallery 
INSERT INTO venue_gallery (venue_id, imgs, created_at, updated_at) VALUES 
(1, ARRAY['https://picsum.photos/300/200?random=1','https://picsum.photos/300/200?random=2','https://picsum.photos/300/200?random=3','https://picsum.photos/300/200?random=4','https://picsum.photos/300/200?random=5','https://picsum.photos/300/200?random=6','https://picsum.photos/300/200?random=7'], NOW(), NOW()),
(2, ARRAY['https://picsum.photos/300/200?random=8','https://picsum.photos/300/200?random=9','https://picsum.photos/300/200?random=10','https://picsum.photos/300/200?random=11','https://picsum.photos/300/200?random=12','https://picsum.photos/300/200?random=13','https://picsum.photos/300/200?random=14'], NOW(), NOW()),
(3, ARRAY['https://picsum.photos/300/200?random=15','https://picsum.photos/300/200?random=16','https://picsum.photos/300/200?random=17','https://picsum.photos/300/200?random=18','https://picsum.photos/300/200?random=19','https://picsum.photos/300/200?random=20','https://picsum.photos/300/200?random=21'], NOW(), NOW()),
(4, ARRAY['https://picsum.photos/300/200?random=22','https://picsum.photos/300/200?random=23','https://picsum.photos/300/200?random=24','https://picsum.photos/300/200?random=25','https://picsum.photos/300/200?random=26','https://picsum.photos/300/200?random=27','https://picsum.photos/300/200?random=28'], NOW(), NOW()),
(5, ARRAY['https://picsum.photos/300/200?random=29','https://picsum.photos/300/200?random=30','https://picsum.photos/300/200?random=31','https://picsum.photos/300/200?random=32','https://picsum.photos/300/200?random=33','https://picsum.photos/300/200?random=34','https://picsum.photos/300/200?random=35'], NOW(), NOW()),
(6, ARRAY['https://picsum.photos/300/200?random=36','https://picsum.photos/300/200?random=37','https://picsum.photos/300/200?random=38','https://picsum.photos/300/200?random=39','https://picsum.photos/300/200?random=40','https://picsum.photos/300/200?random=41','https://picsum.photos/300/200?random=42'], NOW(), NOW()),
(7, ARRAY['https://picsum.photos/300/200?random=43','https://picsum.photos/300/200?random=44','https://picsum.photos/300/200?random=45','https://picsum.photos/300/200?random=46','https://picsum.photos/300/200?random=47','https://picsum.photos/300/200?random=48','https://picsum.photos/300/200?random=49'], NOW(), NOW()),
(8, ARRAY['https://picsum.photos/300/200?random=50','https://picsum.photos/300/200?random=51','https://picsum.photos/300/200?random=52','https://picsum.photos/300/200?random=53','https://picsum.photos/300/200?random=54','https://picsum.photos/300/200?random=55','https://picsum.photos/300/200?random=56'], NOW(), NOW()),
(9, ARRAY['https://picsum.photos/300/200?random=57','https://picsum.photos/300/200?random=58','https://picsum.photos/300/200?random=59','https://picsum.photos/300/200?random=60','https://picsum.photos/300/200?random=61','https://picsum.photos/300/200?random=62','https://picsum.photos/300/200?random=63'], NOW(), NOW()),
(10, ARRAY['https://picsum.photos/300/200?random=64','https://picsum.photos/300/200?random=65','https://picsum.photos/300/200?random=66','https://picsum.photos/300/200?random=67','https://picsum.photos/300/200?random=68','https://picsum.photos/300/200?random=69','https://picsum.photos/300/200?random=70'], NOW(), NOW()),
(11, ARRAY['https://picsum.photos/300/200?random=71','https://picsum.photos/300/200?random=72','https://picsum.photos/300/200?random=73','https://picsum.photos/300/200?random=74','https://picsum.photos/300/200?random=75','https://picsum.photos/300/200?random=76','https://picsum.photos/300/200?random=77'], NOW(), NOW()),
(12, ARRAY['https://picsum.photos/300/200?random=78','https://picsum.photos/300/200?random=79','https://picsum.photos/300/200?random=80','https://picsum.photos/300/200?random=81','https://picsum.photos/300/200?random=82','https://picsum.photos/300/200?random=83','https://picsum.photos/300/200?random=84'], NOW(), NOW()),
(13, ARRAY['https://picsum.photos/300/200?random=85','https://picsum.photos/300/200?random=86','https://picsum.photos/300/200?random=87','https://picsum.photos/300/200?random=88','https://picsum.photos/300/200?random=89','https://picsum.photos/300/200?random=90','https://picsum.photos/300/200?random=91'], NOW(), NOW()),
(14, ARRAY['https://picsum.photos/300/200?random=92','https://picsum.photos/300/200?random=93','https://picsum.photos/300/200?random=94','https://picsum.photos/300/200?random=95','https://picsum.photos/300/200?random=96','https://picsum.photos/300/200?random=97','https://picsum.photos/300/200?random=98'], NOW(), NOW()),
(15, ARRAY['https://picsum.photos/300/200?random=99','https://picsum.photos/300/200?random=100','https://picsum.photos/300/200?random=101','https://picsum.photos/300/200?random=102','https://picsum.photos/300/200?random=103','https://picsum.photos/300/200?random=104','https://picsum.photos/300/200?random=105'], NOW(), NOW()),
(16, ARRAY['https://picsum.photos/300/200?random=106','https://picsum.photos/300/200?random=107','https://picsum.photos/300/200?random=108','https://picsum.photos/300/200?random=109','https://picsum.photos/300/200?random=110','https://picsum.photos/300/200?random=111','https://picsum.photos/300/200?random=112'], NOW(), NOW()),
(17, ARRAY['https://picsum.photos/300/200?random=113','https://picsum.photos/300/200?random=114','https://picsum.photos/300/200?random=115','https://picsum.photos/300/200?random=116','https://picsum.photos/300/200?random=117','https://picsum.photos/300/200?random=118','https://picsum.photos/300/200?random=119'], NOW(), NOW()),
(18, ARRAY['https://picsum.photos/300/200?random=120','https://picsum.photos/300/200?random=121','https://picsum.photos/300/200?random=122','https://picsum.photos/300/200?random=123','https://picsum.photos/300/200?random=124','https://picsum.photos/300/200?random=125','https://picsum.photos/300/200?random=126'], NOW(), NOW()),
(19, ARRAY['https://picsum.photos/300/200?random=127','https://picsum.photos/300/200?random=128','https://picsum.photos/300/200?random=129','https://picsum.photos/300/200?random=130','https://picsum.photos/300/200?random=131','https://picsum.photos/300/200?random=132','https://picsum.photos/300/200?random=133'], NOW(), NOW()),
(20, ARRAY['https://picsum.photos/300/200?random=134','https://picsum.photos/300/200?random=135','https://picsum.photos/300/200?random=136','https://picsum.photos/300/200?random=137','https://picsum.photos/300/200?random=138','https://picsum.photos/300/200?random=139','https://picsum.photos/300/200?random=140'], NOW(), NOW()),
(21, ARRAY['https://picsum.photos/300/200?random=141','https://picsum.photos/300/200?random=142','https://picsum.photos/300/200?random=143','https://picsum.photos/300/200?random=144','https://picsum.photos/300/200?random=145','https://picsum.photos/300/200?random=146','https://picsum.photos/300/200?random=147'], NOW(), NOW()),
(22, ARRAY['https://picsum.photos/300/200?random=148','https://picsum.photos/300/200?random=149','https://picsum.photos/300/200?random=150','https://picsum.photos/300/200?random=151','https://picsum.photos/300/200?random=152','https://picsum.photos/300/200?random=153','https://picsum.photos/300/200?random=154'], NOW(), NOW()),
(23, ARRAY['https://picsum.photos/300/200?random=155','https://picsum.photos/300/200?random=156','https://picsum.photos/300/200?random=157','https://picsum.photos/300/200?random=158','https://picsum.photos/300/200?random=159','https://picsum.photos/300/200?random=160','https://picsum.photos/300/200?random=161'], NOW(), NOW()),
(24, ARRAY['https://picsum.photos/300/200?random=162','https://picsum.photos/300/200?random=163','https://picsum.photos/300/200?random=164','https://picsum.photos/300/200?random=165','https://picsum.photos/300/200?random=166','https://picsum.photos/300/200?random=167','https://picsum.photos/300/200?random=168'], NOW(), NOW()),
(25, ARRAY['https://picsum.photos/300/200?random=169','https://picsum.photos/300/200?random=170','https://picsum.photos/300/200?random=171','https://picsum.photos/300/200?random=172','https://picsum.photos/300/200?random=173','https://picsum.photos/300/200?random=174','https://picsum.photos/300/200?random=175'], NOW(), NOW()),
(26, ARRAY['https://picsum.photos/300/200?random=176','https://picsum.photos/300/200?random=177','https://picsum.photos/300/200?random=178','https://picsum.photos/300/200?random=179','https://picsum.photos/300/200?random=180','https://picsum.photos/300/200?random=181','https://picsum.photos/300/200?random=182'], NOW(), NOW()),
(27, ARRAY['https://picsum.photos/300/200?random=183','https://picsum.photos/300/200?random=184','https://picsum.photos/300/200?random=185','https://picsum.photos/300/200?random=186','https://picsum.photos/300/200?random=187','https://picsum.photos/300/200?random=188','https://picsum.photos/300/200?random=189'], NOW(), NOW()),
(28, ARRAY['https://picsum.photos/300/200?random=190','https://picsum.photos/300/200?random=191','https://picsum.photos/300/200?random=192','https://picsum.photos/300/200?random=193','https://picsum.photos/300/200?random=194','https://picsum.photos/300/200?random=195','https://picsum.photos/300/200?random=196'], NOW(), NOW()),
(29, ARRAY['https://picsum.photos/300/200?random=197','https://picsum.photos/300/200?random=198','https://picsum.photos/300/200?random=199','https://picsum.photos/300/200?random=200','https://picsum.photos/300/200?random=201','https://picsum.photos/300/200?random=202','https://picsum.photos/300/200?random=203'], NOW(), NOW()),
(30, ARRAY['https://picsum.photos/300/200?random=204','https://picsum.photos/300/200?random=205','https://picsum.photos/300/200?random=206','https://picsum.photos/300/200?random=207','https://picsum.photos/300/200?random=208','https://picsum.photos/300/200?random=209','https://picsum.photos/300/200?random=210'], NOW(), NOW());


! Venue Faqs

INSERT INTO venue_faqs (venue_id, question, answer, created_at, updated_at) VALUES 
(1, '{"en": "What is the capacity?", "ar": "ما هي السعة؟"}'::jsonb, '{"en": "The capacity is 100 people.", "ar": "السعة هي 100 شخص."}'::jsonb, NOW(), NOW()),
(1, '{"en": "What is the capacity?", "ar": "ما هي السعة؟"}'::jsonb, '{"en": "The capacity is 100 people.", "ar": "السعة هي 100 شخص."}'::jsonb, NOW(), NOW()),
(1, '{"en": "Is parking available?", "ar": "هل يوجد موقف للسيارات؟"}'::jsonb, '{"en": "Yes, free parking is available.", "ar": "نعم، يوجد موقف سيارات مجاني."}'::jsonb, NOW(), NOW()),
(1, '{"en": "Is parking available?", "ar": "هل يوجد موقف للسيارات؟"}'::jsonb, '{"en": "Yes, free parking is available.", "ar": "نعم، يوجد موقف سيارات مجاني."}'::jsonb, NOW(), NOW()),
(2, '{"en": "Are pets allowed?", "ar": "هل يُسمح بالحيوانات الأليفة؟"}'::jsonb, '{"en": "No, pets are not allowed.", "ar": "لا، الحيوانات الأليفة غير مسموحة."}'::jsonb, NOW(), NOW()),
(2, '{"en": "Are pets allowed?", "ar": "هل يُسمح بالحيوانات الأليفة؟"}'::jsonb, '{"en": "No, pets are not allowed.", "ar": "لا، الحيوانات الأليفة غير مسموحة."}'::jsonb, NOW(), NOW()),
(2, '{"en": "What are the operating hours?", "ar": "ما هي ساعات العمل؟"}'::jsonb, '{"en": "We are open from 9 AM to 10 PM.", "ar": "نحن مفتوحون من 9 صباحًا حتى 10 مساءً."}'::jsonb, NOW(), NOW()),
(2, '{"en": "What are the operating hours?", "ar": "ما هي ساعات العمل؟"}'::jsonb, '{"en": "We are open from 9 AM to 10 PM.", "ar": "نحن مفتوحون من 9 صباحًا حتى 10 مساءً."}'::jsonb, NOW(), NOW()),
(3, '{"en": "Is catering available?", "ar": "هل توجد خدمة تقديم الطعام؟"}'::jsonb, '{"en": "Yes, catering services are available upon request.", "ar": "نعم، تتوفر خدمات تقديم الطعام عند الطلب."}'::jsonb, NOW(), NOW()),
(3, '{"en": "Is catering available?", "ar": "هل توجد خدمة تقديم الطعام؟"}'::jsonb, '{"en": "Yes, catering services are available upon request.", "ar": "نعم، تتوفر خدمات تقديم الطعام عند الطلب."}'::jsonb, NOW(), NOW()),
(3, '{"en": "Do you offer event planning services?", "ar": "هل تقدمون خدمات تخطيط الفعاليات؟"}'::jsonb, '{"en": "Yes, we have event planning packages.", "ar": "نعم، لدينا باقات لتخطيط الفعاليات."}'::jsonb, NOW(), NOW()),
(3, '{"en": "Do you offer event planning services?", "ar": "هل تقدمون خدمات تخطيط الفعاليات؟"}'::jsonb, '{"en": "Yes, we have event planning packages.", "ar": "نعم، لدينا باقات لتخطيط الفعاليات."}'::jsonb, NOW(), NOW()),
(4, '{"en": "Can I bring my own DJ?", "ar": "هل يمكنني إحضار منسق موسيقى خاص بي؟"}'::jsonb, '{"en": "Yes, but sound restrictions apply.", "ar": "نعم، لكن هناك قيود على الصوت."}'::jsonb, NOW(), NOW()),
(4, '{"en": "Can I bring my own DJ?", "ar": "هل يمكنني إحضار منسق موسيقى خاص بي؟"}'::jsonb, '{"en": "Yes, but sound restrictions apply.", "ar": "نعم، لكن هناك قيود على الصوت."}'::jsonb, NOW(), NOW()),
(4, '{"en": "Is smoking allowed?", "ar": "هل يُسمح بالتدخين؟"}'::jsonb, '{"en": "Smoking is allowed in designated areas.", "ar": "يسمح بالتدخين في الأماكن المخصصة."}'::jsonb, NOW(), NOW()),
(4, '{"en": "Is smoking allowed?", "ar": "هل يُسمح بالتدخين؟"}'::jsonb, '{"en": "Smoking is allowed in designated areas.", "ar": "يسمح بالتدخين في الأماكن المخصصة."}'::jsonb, NOW(), NOW()),
(5, '{"en": "Do you provide security?", "ar": "هل توفرون خدمات أمنية؟"}'::jsonb, '{"en": "Yes, security is included in some packages.", "ar": "نعم، الأمن مشمول في بعض الباقات."}'::jsonb, NOW(), NOW()),
(5, '{"en": "Do you provide security?", "ar": "هل توفرون خدمات أمنية؟"}'::jsonb, '{"en": "Yes, security is included in some packages.", "ar": "نعم، الأمن مشمول في بعض الباقات."}'::jsonb, NOW(), NOW()),
(5, '{"en": "Are decorations included?", "ar": "هل الزينة مشمولة؟"}'::jsonb, '{"en": "Basic decorations are included.", "ar": "الزينة الأساسية مشمولة."}'::jsonb, NOW(), NOW()),
(5, '{"en": "Are decorations included?", "ar": "هل الزينة مشمولة؟"}'::jsonb, '{"en": "Basic decorations are included.", "ar": "الزينة الأساسية مشمولة."}'::jsonb, NOW(), NOW()),
(6, '{"en": "Do you provide audiovisual equipment?", "ar": "هل توفرون معدات الصوت والصورة؟"}'::jsonb, '{"en": "Yes, projectors and sound systems are available.", "ar": "نعم، تتوفر أجهزة العرض وأنظمة الصوت."}'::jsonb, NOW(), NOW()),
(6, '{"en": "Do you provide audiovisual equipment?", "ar": "هل توفرون معدات الصوت والصورة؟"}'::jsonb, '{"en": "Yes, projectors and sound systems are available.", "ar": "نعم، تتوفر أجهزة العرض وأنظمة الصوت."}'::jsonb, NOW(), NOW()),
(6, '{"en": "Is there Wi-Fi available?", "ar": "هل يوجد واي فاي؟"}'::jsonb, '{"en": "Yes, free Wi-Fi is available.", "ar": "نعم، يوجد واي فاي مجاني."}'::jsonb, NOW(), NOW()),
(6, '{"en": "Is there Wi-Fi available?", "ar": "هل يوجد واي فاي؟"}'::jsonb, '{"en": "Yes, free Wi-Fi is available.", "ar": "نعم، يوجد واي فاي مجاني."}'::jsonb, NOW(), NOW()),
(7, '{"en": "Can I visit before booking?", "ar": "هل يمكنني زيارة المكان قبل الحجز؟"}'::jsonb, '{"en": "Yes, visits can be arranged.", "ar": "نعم، يمكن ترتيب الزيارات."}'::jsonb, NOW(), NOW()),
(7, '{"en": "Can I visit before booking?", "ar": "هل يمكنني زيارة المكان قبل الحجز؟"}'::jsonb, '{"en": "Yes, visits can be arranged.", "ar": "نعم، يمكن ترتيب الزيارات."}'::jsonb, NOW(), NOW()),
(7, '{"en": "Is there a cancellation policy?", "ar": "هل توجد سياسة إلغاء؟"}'::jsonb, '{"en": "Yes, cancellations must be made 7 days in advance.", "ar": "نعم، يجب الإلغاء قبل 7 أيام."}'::jsonb, NOW(), NOW()),
(7, '{"en": "Is there a cancellation policy?", "ar": "هل توجد سياسة إلغاء؟"}'::jsonb, '{"en": "Yes, cancellations must be made 7 days in advance.", "ar": "نعم، يجب الإلغاء قبل 7 أيام."}'::jsonb, NOW(), NOW()),
(8, '{"en": "Do you offer group discounts?", "ar": "هل تقدمون خصومات للمجموعات؟"}'::jsonb, '{"en": "Yes, discounts are available for large groups.", "ar": "نعم، تتوفر خصومات للمجموعات الكبيرة."}'::jsonb, NOW(), NOW()),
(8, '{"en": "Do you offer group discounts?", "ar": "هل تقدمون خصومات للمجموعات؟"}'::jsonb, '{"en": "Yes, discounts are available for large groups.", "ar": "نعم، تتوفر خصومات للمجموعات الكبيرة."}'::jsonb, NOW(), NOW()),
(8, '{"en": "What are the payment options?", "ar": "ما هي طرق الدفع؟"}'::jsonb, '{"en": "We accept cash, credit card, and bank transfer.", "ar": "نقبل الدفع نقدًا، وبطاقات الائتمان، والتحويل البنكي."}'::jsonb, NOW(), NOW()),
(8, '{"en": "What are the payment options?", "ar": "ما هي طرق الدفع؟"}'::jsonb, '{"en": "We accept cash, credit card, and bank transfer.", "ar": "نقبل الدفع نقدًا، وبطاقات الائتمان، والتحويل البنكي."}'::jsonb, NOW(), NOW()),
(9, '{"en": "Is there an outdoor area?", "ar": "هل يوجد منطقة خارجية؟"}'::jsonb, '{"en": "Yes, we have a garden space.", "ar": "نعم، لدينا مساحة حديقة."}'::jsonb, NOW(), NOW()),
(9, '{"en": "Is there an outdoor area?", "ar": "هل يوجد منطقة خارجية؟"}'::jsonb, '{"en": "Yes, we have a garden space.", "ar": "نعم، لدينا مساحة حديقة."}'::jsonb, NOW(), NOW()),
(9, '{"en": "Can I bring my own food?", "ar": "هل يمكنني إحضار طعامي الخاص؟"}'::jsonb, '{"en": "No, outside food is not allowed.", "ar": "لا، لا يسمح بإحضار الطعام من الخارج."}'::jsonb, NOW(), NOW()),
(9, '{"en": "Can I bring my own food?", "ar": "هل يمكنني إحضار طعامي الخاص؟"}'::jsonb, '{"en": "No, outside food is not allowed.", "ar": "لا، لا يسمح بإحضار الطعام من الخارج."}'::jsonb, NOW(), NOW()),
(10, '{"en": "Do you have an emergency plan?", "ar": "هل لديكم خطة طوارئ؟"}'::jsonb, '{"en": "Yes, emergency exits and first aid kits are available.", "ar": "نعم، لدينا مخارج طوارئ وصناديق إسعافات أولية."}'::jsonb, NOW(), NOW()),
(10, '{"en": "Do you have an emergency plan?", "ar": "هل لديكم خطة طوارئ؟"}'::jsonb, '{"en": "Yes, emergency exits and first aid kits are available.", "ar": "نعم، لدينا مخارج طوارئ وصناديق إسعافات أولية."}'::jsonb, NOW(), NOW()),
(10, '{"en": "Can I rent extra chairs?", "ar": "هل يمكنني استئجار كراسي إضافية؟"}'::jsonb, '{"en": "Yes, additional seating is available upon request.", "ar": "نعم، تتوفر مقاعد إضافية عند الطلب."}'::jsonb, NOW(), NOW()),
(10, '{"en": "Can I rent extra chairs?", "ar": "هل يمكنني استئجار كراسي إضافية؟"}'::jsonb, '{"en": "Yes, additional seating is available upon request.", "ar": "نعم، تتوفر مقاعد إضافية عند الطلب."}'::jsonb, NOW(), NOW()),
(11, '{"en": "What is the capacity?", "ar": "ما هي السعة؟"}'::jsonb, '{"en": "The capacity is 100 people.", "ar": "السعة هي 100 شخص."}'::jsonb, NOW(), NOW()),
(11, '{"en": "What is the capacity?", "ar": "ما هي السعة؟"}'::jsonb, '{"en": "The capacity is 100 people.", "ar": "السعة هي 100 شخص."}'::jsonb, NOW(), NOW()),
(11, '{"en": "Is parking available?", "ar": "هل يوجد موقف للسيارات؟"}'::jsonb, '{"en": "Yes, free parking is available.", "ar": "نعم، يوجد موقف سيارات مجاني."}'::jsonb, NOW(), NOW()),
(11, '{"en": "Is parking available?", "ar": "هل يوجد موقف للسيارات؟"}'::jsonb, '{"en": "Yes, free parking is available.", "ar": "نعم، يوجد موقف سيارات مجاني."}'::jsonb, NOW(), NOW()),
(12, '{"en": "Are pets allowed?", "ar": "هل يُسمح بالحيوانات الأليفة؟"}'::jsonb, '{"en": "No, pets are not allowed.", "ar": "لا، الحيوانات الأليفة غير مسموحة."}'::jsonb, NOW(), NOW()),
(12, '{"en": "Are pets allowed?", "ar": "هل يُسمح بالحيوانات الأليفة؟"}'::jsonb, '{"en": "No, pets are not allowed.", "ar": "لا، الحيوانات الأليفة غير مسموحة."}'::jsonb, NOW(), NOW()),
(12, '{"en": "What are the operating hours?", "ar": "ما هي ساعات العمل؟"}'::jsonb, '{"en": "We are open from 9 AM to 10 PM.", "ar": "نحن مفتوحون من 9 صباحًا حتى 10 مساءً."}'::jsonb, NOW(), NOW()),
(12, '{"en": "What are the operating hours?", "ar": "ما هي ساعات العمل؟"}'::jsonb, '{"en": "We are open from 9 AM to 10 PM.", "ar": "نحن مفتوحون من 9 صباحًا حتى 10 مساءً."}'::jsonb, NOW(), NOW()),
(13, '{"en": "Is catering available?", "ar": "هل توجد خدمة تقديم الطعام؟"}'::jsonb, '{"en": "Yes, catering services are available upon request.", "ar": "نعم، تتوفر خدمات تقديم الطعام عند الطلب."}'::jsonb, NOW(), NOW()),
(13, '{"en": "Is catering available?", "ar": "هل توجد خدمة تقديم الطعام؟"}'::jsonb, '{"en": "Yes, catering services are available upon request.", "ar": "نعم، تتوفر خدمات تقديم الطعام عند الطلب."}'::jsonb, NOW(), NOW()),
(13, '{"en": "Do you offer event planning services?", "ar": "هل تقدمون خدمات تخطيط الفعاليات؟"}'::jsonb, '{"en": "Yes, we have event planning packages.", "ar": "نعم، لدينا باقات لتخطيط الفعاليات."}'::jsonb, NOW(), NOW()),
(13, '{"en": "Do you offer event planning services?", "ar": "هل تقدمون خدمات تخطيط الفعاليات؟"}'::jsonb, '{"en": "Yes, we have event planning packages.", "ar": "نعم، لدينا باقات لتخطيط الفعاليات."}'::jsonb, NOW(), NOW()),
(14, '{"en": "Can I bring my own DJ?", "ar": "هل يمكنني إحضار منسق موسيقى خاص بي؟"}'::jsonb, '{"en": "Yes, but sound restrictions apply.", "ar": "نعم، لكن هناك قيود على الصوت."}'::jsonb, NOW(), NOW()),
(14, '{"en": "Can I bring my own DJ?", "ar": "هل يمكنني إحضار منسق موسيقى خاص بي؟"}'::jsonb, '{"en": "Yes, but sound restrictions apply.", "ar": "نعم، لكن هناك قيود على الصوت."}'::jsonb, NOW(), NOW()),
(14, '{"en": "Is smoking allowed?", "ar": "هل يُسمح بالتدخين؟"}'::jsonb, '{"en": "Smoking is allowed in designated areas.", "ar": "يسمح بالتدخين في الأماكن المخصصة."}'::jsonb, NOW(), NOW()),
(14, '{"en": "Is smoking allowed?", "ar": "هل يُسمح بالتدخين؟"}'::jsonb, '{"en": "Smoking is allowed in designated areas.", "ar": "يسمح بالتدخين في الأماكن المخصصة."}'::jsonb, NOW(), NOW()),
(15, '{"en": "Do you provide security?", "ar": "هل توفرون خدمات أمنية؟"}'::jsonb, '{"en": "Yes, security is included in some packages.", "ar": "نعم، الأمن مشمول في بعض الباقات."}'::jsonb, NOW(), NOW()),
(15, '{"en": "Do you provide security?", "ar": "هل توفرون خدمات أمنية؟"}'::jsonb, '{"en": "Yes, security is included in some packages.", "ar": "نعم، الأمن مشمول في بعض الباقات."}'::jsonb, NOW(), NOW()),
(15, '{"en": "Are decorations included?", "ar": "هل الزينة مشمولة؟"}'::jsonb, '{"en": "Basic decorations are included.", "ar": "الزينة الأساسية مشمولة."}'::jsonb, NOW(), NOW()),
(15, '{"en": "Are decorations included?", "ar": "هل الزينة مشمولة؟"}'::jsonb, '{"en": "Basic decorations are included.", "ar": "الزينة الأساسية مشمولة."}'::jsonb, NOW(), NOW()),
(16, '{"en": "Do you provide audiovisual equipment?", "ar": "هل توفرون معدات الصوت والصورة؟"}'::jsonb, '{"en": "Yes, projectors and sound systems are available.", "ar": "نعم، تتوفر أجهزة العرض وأنظمة الصوت."}'::jsonb, NOW(), NOW()),
(16, '{"en": "Do you provide audiovisual equipment?", "ar": "هل توفرون معدات الصوت والصورة؟"}'::jsonb, '{"en": "Yes, projectors and sound systems are available.", "ar": "نعم، تتوفر أجهزة العرض وأنظمة الصوت."}'::jsonb, NOW(), NOW()),
(16, '{"en": "Is there Wi-Fi available?", "ar": "هل يوجد واي فاي؟"}'::jsonb, '{"en": "Yes, free Wi-Fi is available.", "ar": "نعم، يوجد واي فاي مجاني."}'::jsonb, NOW(), NOW()),
(16, '{"en": "Is there Wi-Fi available?", "ar": "هل يوجد واي فاي؟"}'::jsonb, '{"en": "Yes, free Wi-Fi is available.", "ar": "نعم، يوجد واي فاي مجاني."}'::jsonb, NOW(), NOW()),
(17, '{"en": "Can I visit before booking?", "ar": "هل يمكنني زيارة المكان قبل الحجز؟"}'::jsonb, '{"en": "Yes, visits can be arranged.", "ar": "نعم، يمكن ترتيب الزيارات."}'::jsonb, NOW(), NOW()),
(17, '{"en": "Can I visit before booking?", "ar": "هل يمكنني زيارة المكان قبل الحجز؟"}'::jsonb, '{"en": "Yes, visits can be arranged.", "ar": "نعم، يمكن ترتيب الزيارات."}'::jsonb, NOW(), NOW()),
(17, '{"en": "Is there a cancellation policy?", "ar": "هل توجد سياسة إلغاء؟"}'::jsonb, '{"en": "Yes, cancellations must be made 7 days in advance.", "ar": "نعم، يجب الإلغاء قبل 7 أيام."}'::jsonb, NOW(), NOW()),
(17, '{"en": "Is there a cancellation policy?", "ar": "هل توجد سياسة إلغاء؟"}'::jsonb, '{"en": "Yes, cancellations must be made 7 days in advance.", "ar": "نعم، يجب الإلغاء قبل 7 أيام."}'::jsonb, NOW(), NOW()),
(18, '{"en": "Do you offer group discounts?", "ar": "هل تقدمون خصومات للمجموعات؟"}'::jsonb, '{"en": "Yes, discounts are available for large groups.", "ar": "نعم، تتوفر خصومات للمجموعات الكبيرة."}'::jsonb, NOW(), NOW()),
(18, '{"en": "Do you offer group discounts?", "ar": "هل تقدمون خصومات للمجموعات؟"}'::jsonb, '{"en": "Yes, discounts are available for large groups.", "ar": "نعم، تتوفر خصومات للمجموعات الكبيرة."}'::jsonb, NOW(), NOW()),
(18, '{"en": "What are the payment options?", "ar": "ما هي طرق الدفع؟"}'::jsonb, '{"en": "We accept cash, credit card, and bank transfer.", "ar": "نقبل الدفع نقدًا، وبطاقات الائتمان، والتحويل البنكي."}'::jsonb, NOW(), NOW()),
(18, '{"en": "What are the payment options?", "ar": "ما هي طرق الدفع؟"}'::jsonb, '{"en": "We accept cash, credit card, and bank transfer.", "ar": "نقبل الدفع نقدًا، وبطاقات الائتمان، والتحويل البنكي."}'::jsonb, NOW(), NOW()),
(19, '{"en": "Is there an outdoor area?", "ar": "هل يوجد منطقة خارجية؟"}'::jsonb, '{"en": "Yes, we have a garden space.", "ar": "نعم، لدينا مساحة حديقة."}'::jsonb, NOW(), NOW()),
(19, '{"en": "Is there an outdoor area?", "ar": "هل يوجد منطقة خارجية؟"}'::jsonb, '{"en": "Yes, we have a garden space.", "ar": "نعم، لدينا مساحة حديقة."}'::jsonb, NOW(), NOW()),
(19, '{"en": "Can I bring my own food?", "ar": "هل يمكنني إحضار طعامي الخاص؟"}'::jsonb, '{"en": "No, outside food is not allowed.", "ar": "لا، لا يسمح بإحضار الطعام من الخارج."}'::jsonb, NOW(), NOW()),
(19, '{"en": "Can I bring my own food?", "ar": "هل يمكنني إحضار طعامي الخاص؟"}'::jsonb, '{"en": "No, outside food is not allowed.", "ar": "لا، لا يسمح بإحضار الطعام من الخارج."}'::jsonb, NOW(), NOW()),
(20, '{"en": "Do you have an emergency plan?", "ar": "هل لديكم خطة طوارئ؟"}'::jsonb, '{"en": "Yes, emergency exits and first aid kits are available.", "ar": "نعم، لدينا مخارج طوارئ وصناديق إسعافات أولية."}'::jsonb, NOW(), NOW()),
(20, '{"en": "Do you have an emergency plan?", "ar": "هل لديكم خطة طوارئ؟"}'::jsonb, '{"en": "Yes, emergency exits and first aid kits are available.", "ar": "نعم، لدينا مخارج طوارئ وصناديق إسعافات أولية."}'::jsonb, NOW(), NOW()),
(20, '{"en": "Can I rent extra chairs?", "ar": "هل يمكنني استئجار كراسي إضافية؟"}'::jsonb, '{"en": "Yes, additional seating is available upon request.", "ar": "نعم، تتوفر مقاعد إضافية عند الطلب."}'::jsonb, NOW(), NOW()),
(20, '{"en": "Can I rent extra chairs?", "ar": "هل يمكنني استئجار كراسي إضافية؟"}'::jsonb, '{"en": "Yes, additional seating is available upon request.", "ar": "نعم، تتوفر مقاعد إضافية عند الطلب."}'::jsonb, NOW(), NOW());







! Venues 
INSERT INTO venue (property_id, occasion_id, name, description, operating_system, lat, lng, price, phone, email, contact_person, opens_at, closes_at, area, max_capacity, min_capacity, is_fixed_setup, u_shape, theatre_style, round_table, classroom, is_featured, created_at, updated_at, profile_image_id) VALUES
  (5, 3, '{"en": "Royal Ballroom", "ar": "قاعة رويال"}', '{"en": "A grand ballroom in the heart of Riyadh.", "ar": "قاعة فاخرة في قلب الرياض."}',  'Windows', 24.7136, 46.6753, 25000, '+966501234567', 'venue1@example.com', 'Mohammed Al-Saud', '18:00:00', '02:00:00', 500, 300, 100, true, false, true, true, false, true, NOW(), NOW(), 1),
  (10, 7, '{"en": "Al Khobar Beach Hall", "ar": "قاعة شاطئ الخبر"}', '{"en": "A beautiful beachfront venue with modern facilities.", "ar": "قاعة مطلة على البحر مع مرافق حديثة."}',  'Windows', 26.2833, 50.2000, 18000, '+966502345678', 'venue2@example.com', 'Faisal Bin Khalid', '17:00:00', '01:00:00', 350, 200, 80, true, false, true, false, true, false, NOW(), NOW(), 2),
  (15, 12, '{"en": "Jeddah Marina Venue", "ar": "قاعة جدة مارينا"}', '{"en": "A luxurious marina-side venue in Jeddah.", "ar": "قاعة فاخرة بجانب المارينا في جدة."}',  'Windows', 21.4858, 39.1925, 30000, '+966503456789', 'venue3@example.com', 'Salem Al-Mutairi', '19:00:00', '03:00:00', 600, 400, 150, true, true, false, false, false, true, NOW(), NOW(), 3),
  (20, 5, '{"en": "Riyadh Conference Center", "ar": "مركز مؤتمرات الرياض"}', '{"en": "A premium business venue for conferences and corporate events.", "ar": "قاعة مؤتمرات راقية للاجتماعات والفعاليات التجارية."}',  'Windows', 24.7743, 46.7386, 35000, '+966504567890', 'venue4@example.com', 'Nasser Al-Qahtani', '08:00:00', '22:00:00', 700, 500, 200, false, true, false, true, false, false, NOW(), NOW(), 4),
  (25, 8, '{"en": "Dammam Elegant Hall", "ar": "قاعة الدمام الأنيقة"}', '{"en": "A beautifully decorated venue for weddings and celebrations.", "ar": "قاعة مزينة بشكل جميل لحفلات الزفاف والاحتفالات."}',  'Windows', 26.3927, 49.9777, 22000, '+966505678901', 'venue5@example.com', 'Hamad Al-Dosari', '16:00:00', '02:00:00', 450, 250, 120, true, false, true, true, false, true, NOW(), NOW(), 5),
  (3, 10, '{"en": "Desert Retreat", "ar": "منتجع الصحراء"}', '{"en": "A serene venue in the Saudi desert for exclusive retreats.", "ar": "مكان هادئ في الصحراء السعودية للفعاليات الحصرية."}',  'Windows', 24.7135, 46.6756, 28000, '+966506789012', 'venue6@example.com', 'Majed Al-Shehri', '10:00:00', '23:00:00', 800, 600, 250, false, false, true, false, true, false, NOW(), NOW(), 6),
  (8, 14, '{"en": "AlUla Heritage Venue", "ar": "قاعة العلا التراثية"}', '{"en": "An ancient-style venue in the stunning AlUla region.", "ar": "قاعة مستوحاة من التراث في منطقة العلا الخلابة."}',  'Windows', 26.6333, 37.9333, 40000, '+966507890123', 'venue7@example.com', 'Sultan Al-Harbi', '15:00:00', '00:00:00', 900, 700, 300, true, true, false, false, true, true, NOW(), NOW(), 7),
  (12, 1, '{"en": "Mecca Grand Hall", "ar": "قاعة مكة الكبرى"}', '{"en": "A prestigious venue in the holy city of Mecca.", "ar": "قاعة مرموقة في المدينة المقدسة مكة."}',  'Windows', 21.3891, 39.8579, 50000, '+966508901234', 'venue8@example.com', 'Abdullah Al-Fayez', '09:00:00', '21:00:00', 1000, 800, 350, false, false, true, true, false, true, NOW(), NOW(), 8),
  (18, 6, '{"en": "Taif Mountain Resort", "ar": "منتجع الطائف الجبلي"}', '{"en": "A peaceful high-altitude venue in the Taif mountains.", "ar": "مكان هادئ على ارتفاع عالٍ في جبال الطائف."}',  'Windows', 21.2667, 40.4167, 27000, '+966509012345', 'venue9@example.com', 'Ibrahim Al-Otaibi', '14:00:00', '23:00:00', 600, 400, 200, true, true, false, false, true, false, NOW(), NOW(), 9),
  (24, 9, '{"en": "Jubail Luxury Hall", "ar": "قاعة الجبيل الفاخرة"}', '{"en": "An elegant event space in the modern city of Jubail.", "ar": "قاعة فاخرة في مدينة الجبيل الحديثة."}',  'Windows', 27.0047, 49.6616, 32000, '+966510123456', 'venue10@example.com', 'Omar Al-Tamimi', '11:00:00', '23:59:00', 550, 350, 150, true, false, true, true, false, true, NOW(), NOW(), 10),
  (2, 4, '{"en": "Riyadh Elegance Hall", "ar": "قاعة رقي الرياض"}','{"en": "A luxurious wedding hall in the heart of Riyadh.", "ar": "قاعة زفاف فاخرة في قلب الرياض."}', 'Windows', 24.7136, 46.6753, 27000, '+966511223344', 'venue11@example.com', 'Ahmed Al-Farhan', '17:00:00', '01:00:00', 550, 320, 120, true, false, true, false, true, true, NOW(), NOW(), 11),
  (7, 10, '{"en": "Dammam Pearl Ballroom", "ar": "قاعة لؤلؤة الدمام"}','{"en": "A grand venue for luxury weddings in Dammam.", "ar": "قاعة رائعة لحفلات الزفاف الفاخرة في الدمام."}', 'Windows', 26.3927, 49.9777, 30000, '+966522334455', 'venue12@example.com', 'Salem Al-Rashed', '18:00:00', '02:30:00', 650, 400, 150, true, true, false, true, false, false, NOW(), NOW(), 12),
  (12, 3, '{"en": "Jeddah Coral Venue", "ar": "قاعة المرجان جدة"}','{"en": "A modern and stylish venue for weddings and conferences.", "ar": "قاعة عصرية وأنيقة لحفلات الزفاف والمؤتمرات."}', 'Windows', 21.4858, 39.1925, 32000, '+966533445566', 'venue13@example.com', 'Omar Al-Juhani', '19:00:00', '03:00:00', 700, 500, 200, false, false, true, true, false, true, NOW(), NOW(), 13),
  (18, 7, '{"en": "AlUla Desert Jewel", "ar": "جوهرة العلا الصحراوية"}','{"en": "A breathtaking venue surrounded by AlUla’s stunning rock formations.", "ar": "قاعة مذهلة محاطة بتكوينات العلا الصخرية الجميلة."}', 'Windows', 26.6333, 37.9333, 38000, '+966544556677', 'venue14@example.com', 'Mansour Al-Tamimi', '16:00:00', '00:30:00', 850, 600, 250, true, true, false, false, true, false, NOW(), NOW(), 14),
  (21, 14, '{"en": "Khobar Bay Conference Center", "ar": "مركز مؤتمرات خليج الخبر"}','{"en": "A top-notch business conference venue with state-of-the-art facilities.", "ar": "مركز مؤتمرات راقي مجهز بأحدث المرافق."}', 'Windows', 26.2833, 50.2000, 45000, '+966555667788', 'venue15@example.com', 'Faisal Al-Qahtani', '08:30:00', '22:00:00', 1000, 750, 300, false, true, false, true, false, false, NOW(), NOW(), 15),
  (5, 9, '{"en": "Madinah Serenity Hall", "ar": "قاعة الصفاء المدينة"}','{"en": "A peaceful and elegant venue in the holy city of Madinah.", "ar": "قاعة هادئة وأنيقة في المدينة المنورة."}', 'Windows', 24.4672, 39.6115, 28000, '+966566778899', 'venue16@example.com', 'Hassan Al-Harbi', '14:30:00', '23:30:00', 750, 500, 180, true, false, true, false, true, true, NOW(), NOW(), 16),
  (9, 6, '{"en": "Jubail Elite Venue", "ar": "قاعة النخبة الجبيل"}','{"en": "A sophisticated venue designed for premium events and galas.", "ar": "قاعة راقية مصممة للفعاليات الفاخرة والاحتفالات."}', 'Windows', 27.0047, 49.6616, 39000, '+966577889900', 'venue17@example.com', 'Nasser Al-Dosari', '17:30:00', '02:30:00', 880, 650, 270, true, true, false, true, false, false, NOW(), NOW(), 17),
  (15, 2, '{"en": "Taif Mountain Breeze", "ar": "قاعة نسيم الجبل الطائف"}','{"en": "A unique venue offering cool mountain air and scenic views.", "ar": "قاعة مميزة توفر هواء جبلي نقي ومناظر خلابة."}', 'Windows', 21.2667, 40.4167, 26000, '+966588990011', 'venue18@example.com', 'Yousef Al-Otaibi', '15:00:00', '23:00:00', 620, 450, 200, true, true, true, false, true, true, NOW(), NOW(), 18),
  (24, 12, '{"en": "Yanbu Seaside Retreat", "ar": "منتجع ينبع البحري"}','{"en": "A peaceful retreat by the Red Sea, ideal for weddings and celebrations.", "ar": "منتجع هادئ على البحر الأحمر، مثالي لحفلات الزفاف والاحتفالات."}', 'Windows', 24.0891, 38.0634, 35000, '+966599001122', 'venue19@example.com', 'Saeed Al-Mutlaq', '18:00:00', '02:00:00', 700, 520, 220, true, false, true, true, false, false, NOW(), NOW(), 19),
  (23, 11, '{"en": "Neom Skyline Hall", "ar": "قاعة نيون سكايلاين"}','{"en": "A futuristic venue in the ambitious Neom project.", "ar": "قاعة مستقبلية ضمن مشروع نيوم الطموح."}', 'Windows', 27.9000, 35.9000, 50000, '+966600112233', 'venue20@example.com', 'Ali Al-Shehri', '19:00:00', '03:30:00', 1100, 900, 400, true, true, false, false, true, true, NOW(), NOW(), 20);








! FAQs

INSERT INTO venue_faq (venue_id, question, answer, created_at, updated_at)
	VALUES 
	(1, '{"en": "What are the operating hours?", "ar": "ما هي ساعات العمل؟"}', '{"en": "We are open from 9 AM to 10 PM.", "ar": "نحن نعمل من الساعة 9 صباحًا حتى 10 مساءً."}', NOW(), NOW()),
	(1, '{"en": "Is parking available?", "ar": "هل تتوفر مواقف سيارات؟"}', '{"en": "Yes, free parking is available for all guests.", "ar": "نعم، المواقف مجانية لجميع الزوار."}', NOW(), NOW()),
	(2, '{"en": "Do you offer catering services?", "ar": "هل تقدمون خدمات الطعام؟"}', '{"en": "Yes, we provide a variety of catering options.", "ar": "نعم، نقدم مجموعة متنوعة من خدمات الطعام."}', NOW(), NOW()),
	(2, '{"en": "Can we bring our own decorations?", "ar": "هل يمكننا إحضار زينة خاصة بنا؟"}', '{"en": "Yes, as long as it complies with our safety guidelines.", "ar": "نعم، طالما أنها تتوافق مع إرشادات السلامة."}', NOW(), NOW()),
	(3, '{"en": "Is there an outdoor seating area?", "ar": "هل توجد منطقة جلوس خارجية؟"}', '{"en": "Yes, we have a spacious outdoor area.", "ar": "نعم، لدينا منطقة جلوس خارجية واسعة."}', NOW(), NOW()),
	(3, '{"en": "Do you allow pets?", "ar": "هل يسمح بالحيوانات الأليفة؟"}', '{"en": "Yes, pets are allowed in designated areas.", "ar": "نعم، يسمح بالحيوانات الأليفة في المناطق المخصصة."}', NOW(), NOW()),
	(4, '{"en": "What is the maximum capacity?", "ar": "ما هي السعة القصوى؟"}', '{"en": "We can accommodate up to 200 guests.", "ar": "يمكننا استضافة ما يصل إلى 200 ضيف."}', NOW(), NOW()),
	(4, '{"en": "Do you provide audio-visual equipment?", "ar": "هل توفرون معدات الصوت والفيديو؟"}', '{"en": "Yes, we offer AV equipment for events.", "ar": "نعم، نوفر معدات صوت وفيديو للحفلات."}', NOW(), NOW()),
	(1, '{"en": "Is there a cancellation policy?", "ar": "هل توجد سياسة إلغاء؟"}', '{"en": "Yes, cancellations are allowed up to 48 hours in advance.", "ar": "نعم، يُسمح بالإلغاء قبل 48 ساعة من الموعد."}', NOW(), NOW()),
	(2, '{"en": "Do you have wheelchair access?", "ar": "هل لديكم مداخل لذوي الاحتياجات الخاصة؟"}', '{"en": "Yes, our venue is fully wheelchair accessible.", "ar": "نعم، موقعنا مناسب تمامًا للكراسي المتحركة."}', NOW(), NOW()),
  
  

(1, 'admin.admin'),
(2, 'users.create'),
(3, 'users.read'),
(4, 'users.update'),
(5, 'users.delete'),
(6, 'user_preferences.create'),
(7, 'user_preferences.read'),
(8, 'user_preferences.update'),
(9, 'user_preferences.delete'),
(10, 'user_notifications.create'),
(11, 'user_notifications.read'),
(12, 'user_notifications.update'),
(13, 'user_notifications.delete'),
(14, 'permissions.create'),
(15, 'permissions.read'),
(16, 'permissions.update'),
(17, 'permissions.delete'),
(18, 'roles.create'),
(19, 'roles.read'),
(20, 'roles.update'),
(21, 'roles.delete'),
(22, 'role_permissions.create'),
(23, 'role_permissions.read'),
(24, 'role_permissions.update'),
(25, 'role_permissions.delete'),
(26, 'properties.create'),
(27, 'properties.read'),
(28, 'properties.update'),
(29, 'properties.delete'),
(30, 'cities.create'),
(31, 'cities.read'),
(32, 'cities.update'),
(33, 'cities.delete'),
(34, 'countries.create'),
(35, 'countries.read'),
(36, 'countries.update'),
(37, 'countries.delete'),
(38, 'occasion_types.create'),
(39, 'occasion_types.read'),
(40, 'occasion_types.update'),
(41, 'occasion_types.delete'),
(42, 'features.create'),
(43, 'features.read'),
(44, 'features.update'),
(45, 'features.delete'),
(46, 'venue_feature.create'),
(47, 'venue_feature.read'),
(48, 'venue_feature.update'),
(49, 'venue_feature.delete'),
(50, 'venues.create'),
(51, 'venues.read'),
(52, 'venues.update'),
(53, 'venues.delete'),
(54, 'equipment.create'),
(55, 'equipment.read'),
(56, 'equipment.update'),
(57, 'equipment.delete'),
(58, 'venue_equipment.create'),
(59, 'venue_equipment.read'),
(60, 'venue_equipment.update'),
(61, 'venue_equipment.delete'),
(62, 'services.create'),
(63, 'services.read'),
(64, 'services.update'),
(65, 'services.delete'),
(66, 'venue_service.create'),
(67, 'venue_service.read'),
(68, 'venue_service.update'),
(69, 'venue_service.delete'),
(70, 'policies.create'),
(71, 'policies.read'),
(72, 'policies.update'),
(73, 'policies.delete'),
(74, 'venue_policy.create'),
(75, 'venue_policy.read'),
(76, 'venue_policy.update'),
(77, 'venue_policy.delete'),
(78, 'venue_calendar.create'),
(79, 'venue_calendar.read'),
(80, 'venue_calendar.update'),
(81, 'venue_calendar.delete'),
(82, 'venue_package.create'),
(83, 'venue_package.read'),
(84, 'venue_package.update'),
(85, 'venue_package.delete'),
(86, 'venue_package_service.create'),
(87, 'venue_package_service.read'),
(88, 'venue_package_service.update'),
(89, 'venue_package_service.delete'),
(90, 'venue_package_equipment.create'),
(91, 'venue_package_equipment.read'),
(92, 'venue_package_equipment.update'),
(93, 'venue_package_equipment.delete'),
(94, 'venue_gallery.create'),
(95, 'venue_gallery.read'),
(96, 'venue_gallery.update'),
(97, 'venue_gallery.delete'),
(98, 'media.create'),
(99, 'media.read'),
(100, 'media.update'),
(101, 'media.delete'),
(102, 'venue_faq.create'),
(103, 'venue_faq.read'),
(104, 'venue_faq.update'),
(105, 'venue_faq.delete'),
(106, 'reservations.create'),
(107, 'reservations.read'),
(108, 'reservations.update'),
(109, 'reservations.delete'),
(110, 'payments.create'),
(111, 'payments.read'),
(112, 'payments.update'),
(113, 'payments.delete'),
(114, 'communication.create'),
(115, 'communication.read'),
(116, 'communication.update'),
(117, 'communication.delete'),
(118, 'tickets.create'),
(119, 'tickets.read'),
(120, 'tickets.update'),
(121, 'tickets.delete'),
(122, 'otp.create'),
(123, 'otp.read'),
(124, 'otp.update'),
(125, 'otp.delete'),
(126, 'website_settings.create'),
(127, 'website_settings.read'),
(128, 'website_settings.update'),
(129, 'website_settings.delete'),
(130, 'fcms.create'),
(131, 'fcms.read'),
(132, 'fcms.update'),
(133, 'fcms.delete'),

*/

/*


-- Insert data into countries table
INSERT INTO countries (id, name, created_at, updated_at, "deletedAt") VALUES
(1, 'United States', NOW(), NOW(), NULL),
(2, 'United Kingdom', NOW(), NOW(), NULL),
(3, 'Germany', NOW(), NOW(), NULL),
(4, 'France', NOW(), NOW(), NULL),
(5, 'Japan', NOW(), NOW(), NULL);

-- Insert data into city table
INSERT INTO city (id, name, created_at, updated_at, "deletedAt", country_id) VALUES
(1, 'New York', NOW(), NOW(), NULL, 1),
(2, 'London', NOW(), NOW(), NULL, 2),
(3, 'Berlin', NOW(), NOW(), NULL, 3),
(4, 'Paris', NOW(), NOW(), NULL, 4),
(5, 'Tokyo', NOW(), NOW(), NULL, 5);

-- Insert data into roles table
INSERT INTO roles (id, name) VALUES
(1, 'admin'),
(2, 'vendor'),
(3, 'customer'),
(4, 'manager'),
(5, 'support');

-- Insert data into permissions table
INSERT INTO permissions (id, permission_name) VALUES
(1, 'create_venue'),
(2, 'edit_venue'),
(3, 'delete_venue'),
(4, 'view_venue'),
(5, 'manage_users'),
(6, 'manage_bookings'),
(7, 'view_reports'),
(8, 'manage_settings');

-- Insert data into role_permissions table
INSERT INTO role_permissions (id, "roleId", "permissionId") VALUES
(1, 1, 1), (2, 1, 2), (3, 1, 3), (4, 1, 4), (5, 1, 5), (6, 1, 6), (7, 1, 7), (8, 1, 8),
(9, 2, 1), (10, 2, 2), (11, 2, 4), (12, 2, 6),
(13, 3, 4), (14, 3, 6),
(15, 4, 1), (16, 4, 2), (17, 4, 4), (18, 4, 6), (19, 4, 7),
(20, 5, 4), (21, 5, 6), (22, 5, 7);

-- Insert data into roles_permissions_permissions table
INSERT INTO roles_permissions_permissions ("rolesId", "permissionsId") VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8),
(2, 1), (2, 2), (2, 4), (2, 6),
(3, 4), (3, 6),
(4, 1), (4, 2), (4, 4), (4, 6), (4, 7),
(5, 4), (5, 6), (5, 7);

-- Insert data into user table
INSERT INTO "user" (id, full_name, email, phone, password, status, avatar, "otpToken", "otpExpire", created_at, updated_at, "isSubscribed", "roleId") VALUES
(1, 'Admin User', 'admin@example.com', '1234567890', '$2a$10$X5wDFwH.7X1J3qZzJQYJQOeXQN9v9QYJQOeXQN9v9QYJQOeXQN9v9QYJ', 'active', 'avatar1.jpg', NULL, NULL, NOW(), NOW(), TRUE, 1),
(2, 'Vendor User', 'vendor@example.com', '2345678901', '$2a$10$X5wDFwH.7X1J3qZzJQYJQOeXQN9v9QYJQOeXQN9v9QYJQOeXQN9v9QYJ', 'active', 'avatar2.jpg', NULL, NULL, NOW(), NOW(), TRUE, 2),
(3, 'Customer User', 'customer@example.com', '3456789012', '$2a$10$X5wDFwH.7X1J3qZzJQYJQOeXQN9v9QYJQOeXQN9v9QYJQOeXQN9v9QYJ', 'active', 'avatar3.jpg', NULL, NULL, NOW(), NOW(), FALSE, 3),
(4, 'Manager User', 'manager@example.com', '4567890123', '$2a$10$X5wDFwH.7X1J3qZzJQYJQOeXQN9v9QYJQOeXQN9v9QYJQOeXQN9v9QYJ', 'active', 'avatar4.jpg', NULL, NULL, NOW(), NOW(), TRUE, 4),
(5, 'Support User', 'support@example.com', '5678901234', '$2a$10$X5wDFwH.7X1J3qZzJQYJQOeXQN9v9QYJQOeXQN9v9QYJQOeXQN9v9QYJ', 'active', 'avatar5.jpg', NULL, NULL, NOW(), NOW(), FALSE, 5);


-- Insert data into fcm table
INSERT INTO fcm (id, device_token, platform, is_active, created_at, updated_at, "userId") VALUES
(1, 'device_token_1', 'android', TRUE, NOW(), NOW(), 1),
(2, 'device_token_2', 'ios', TRUE, NOW(), NOW(), 2),
(3, 'device_token_3', 'android', TRUE, NOW(), NOW(), 3),
(4, 'device_token_4', 'ios', TRUE, NOW(), NOW(), 4),
(5, 'device_token_5', 'android', FALSE, NOW(), NOW(), 5);

-- Insert data into otp table
INSERT INTO otp (id, otp_code, otp_expiry, created_at, updated_at, "userId") VALUES
(1, '123456', NOW() + INTERVAL '10 minutes', NOW(), NOW(), 1),
(2, '234567', NOW() + INTERVAL '10 minutes', NOW(), NOW(), 2),
(3, '345678', NOW() + INTERVAL '10 minutes', NOW(), NOW(), 3),
(4, '456789', NOW() + INTERVAL '10 minutes', NOW(), NOW(), 4),
(5, '567890', NOW() + INTERVAL '10 minutes', NOW(), NOW(), 5);

-- Insert data into media table
INSERT INTO media (id, model_id, model_type, collection_name, name, url, file_name, mime_type, disk, size, manipulations, custom_properties, "order", created_at, updated_at) VALUES
(1, 1, 'venue', 'images', 'venue1.jpg', 'https://example.com/venue1.jpg', 'venue1.jpg', 'image/jpeg', 'public', 1024, '[]', '[]', 1, NOW(), NOW()),
(2, 2, 'venue', 'images', 'venue2.jpg', 'https://example.com/venue2.jpg', 'venue2.jpg', 'image/jpeg', 'public', 2048, '[]', '[]', 2, NOW(), NOW()),
(3, 3, 'venue', 'images', 'venue3.jpg', 'https://example.com/venue3.jpg', 'venue3.jpg', 'image/jpeg', 'public', 3072, '[]', '[]', 3, NOW(), NOW()),
(4, 4, 'venue', 'images', 'venue4.jpg', 'https://example.com/venue4.jpg', 'venue4.jpg', 'image/jpeg', 'public', 4096, '[]', '[]', 4, NOW(), NOW()),
(5, 5, 'venue', 'images', 'venue5.jpg', 'https://example.com/venue5.jpg', 'venue5.jpg', 'image/jpeg', 'public', 5120, '[]', '[]', 5, NOW(), NOW());

-- Insert data into occasion_type table
INSERT INTO occasion_type (id, name, created_at, updated_at) VALUES
(1, '{"en": "Wedding", "ar": "حفل زفاف"}', NOW(), NOW()),
(2, '{"en": "Conference", "ar": "مؤتمر"}', NOW(), NOW()),
(3, '{"en": "Birthday", "ar": "عيد ميلاد"}', NOW(), NOW()),
(4, '{"en": "Corporate Event", "ar": "حدث شركة"}', NOW(), NOW()),
(5, '{"en": "Exhibition", "ar": "معرض"}', NOW(), NOW());

-- Insert data into property table
INSERT INTO property (id, name, description, file, created_at, updated_at, vendor_id, city_id) VALUES
(1, '{"en": "Grand Ballroom", "ar": "قاعة كبرى"}', '{"en": "Elegant ballroom for weddings", "ar": "قاعة أنيقة لحفلات الزفاف"}', 'property1.pdf', NOW(), NOW(), 2, 1),
(2, '{"en": "Conference Center", "ar": "مركز المؤتمرات"}', '{"en": "Modern conference facilities", "ar": "مرافق مؤتمرات حديثة"}', 'property2.pdf', NOW(), NOW(), 2, 2),
(3, '{"en": "Garden Venue", "ar": "مكان الحديقة"}', '{"en": "Beautiful outdoor garden venue", "ar": "مكان حديقة خارجي جميل"}', 'property3.pdf', NOW(), NOW(), 2, 3),
(4, '{"en": "Rooftop Lounge", "ar": "صالحة السطح"}', '{"en": "Stylish rooftop with city views", "ar": "سطح أنيق بإطلالة على المدينة"}', 'property4.pdf', NOW(), NOW(), 2, 4),
(5, '{"en": "Exhibition Hall", "ar": "قاعة المعارض"}', '{"en": "Spacious hall for exhibitions", "ar": "قاعة واسعة للمعارض"}', 'property5.pdf', NOW(), NOW(), 2, 5);

-- Insert data into feature table
INSERT INTO feature (id, feature_name, icon_media_id, deleted_at, created_at, updated_at) VALUES
(1, '{"en": "WiFi", "ar": "واي فاي"}', 1, NULL, NOW(), NOW()),
(2, '{"en": "Parking", "ar": "موقف سيارات"}', 2, NULL, NOW(), NOW()),
(3, '{"en": "Catering", "ar": "خدمات الطعام"}', 3, NULL, NOW(), NOW()),
(4, '{"en": "AV Equipment", "ar": "معدات الصوت والضوء"}', 4, NULL, NOW(), NOW()),
(5, '{"en": "Outdoor Space", "ar": "مساحة خارجية"}', 5, NULL, NOW(), NOW());

-- Insert data into equipment table
INSERT INTO equipment (id, name, icon_media_id, is_predefined, created_at, updated_at, user_id) VALUES
(1, '{"en": "Projector", "ar": "جهاز عرض"}', 1, TRUE, NOW(), NOW(), NULL),
(2, '{"en": "Microphone", "ar": "ميكروفون"}', 2, TRUE, NOW(), NOW(), NULL),
(3, '{"en": "Stage", "ar": "منصة"}', 3, TRUE, NOW(), NOW(), NULL),
(4, '{"en": "Lighting", "ar": "إضاءة"}', 4, TRUE, NOW(), NOW(), NULL),
(5, '{"en": "Sound System", "ar": "نظام صوتي"}', 5, TRUE, NOW(), NOW(), NULL);

-- Insert data into service table
INSERT INTO service (id, name, icon_media_id, "venuePackageServices_id", is_predefined, created_at, updated_at, user_id) VALUES
(1, '{"en": "Cleaning", "ar": "تنظيف"}', 1, NULL, TRUE, NOW(), NOW(), NULL),
(2, '{"en": "Security", "ar": "أمن"}', 2, NULL, TRUE, NOW(), NOW(), NULL),
(3, '{"en": "Event Planning", "ar": "تخطيط الحدث"}', 3, NULL, TRUE, NOW(), NOW(), NULL),
(4, '{"en": "Photography", "ar": "التصوير"}', 4, NULL, TRUE, NOW(), NOW(), NULL),
(5, '{"en": "Floral Decor", "ar": "ديكور زهري"}', 5, NULL, TRUE, NOW(), NOW(), NULL);

-- Insert data into policy table
INSERT INTO policy (id, name, description, created_at, updated_at, is_predefined, user_id) VALUES
(1, '{"en": "Cancellation Policy", "ar": "سياسة الإلغاء"}', '{"en": "Full refund if cancelled 30 days before", "ar": "استرداد كامل إذا تم الإلغاء قبل 30 يومًا"}', NOW(), NOW(), TRUE, NULL),
(2, '{"en": "Damage Policy", "ar": "سياسة الضرر"}', '{"en": "Client responsible for any damages", "ar": "العميل مسؤول عن أي أضرار"}', NOW(), NOW(), TRUE, NULL),
(3, '{"en": "Alcohol Policy", "ar": "سياسة الكحول"}', '{"en": "No outside alcohol permitted", "ar": "لا يسمح بالكحول الخارجي"}', NOW(), NOW(), TRUE, NULL),
(4, '{"en": "Smoking Policy", "ar": "سياسة التدخين"}', '{"en": "Smoking allowed in designated areas only", "ar": "يسمح بالتدخين في المناطق المخصصة فقط"}', NOW(), NOW(), TRUE, NULL),
(5, '{"en": "Decoration Policy", "ar": "سياسة الديكور"}', '{"en": "No nails or screws in walls", "ar": "لا مسامير أو براغي في الجدران"}', NOW(), NOW(), TRUE, NULL);

-- Insert data into venue table
INSERT INTO venue (id, name, description, operating_system, lat, lng, phone, email, contact_person, opens_at, closes_at, area, price, max_capacity, min_capacity, is_fixed_setup, u_shape, theatre_style, round_table, classroom, is_featured, created_at, updated_at, "visitCount", occasion_id, property_id, vat, type_place, is_multi_place, "responsiblePersonName", "nearestMainAddress", profile_image, "acceptTerms") VALUES
(1, '{"en": "Grand Ballroom", "ar": "القاعة الكبرى"}', '{"en": "Elegant ballroom for weddings and events", "ar": "قاعة أنيقة لحفلات الزفاف والفعاليات"}', '24/7', 40.7128, -74.0060, '1234567890', 'ballroom@example.com', 'John Doe', '08:00', '22:00', 500, 5000, 300, 50, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, NOW(), NOW(), 100, 1, 1, 0.15, 'indoor', FALSE, 'John Doe', '123 Main St', 'ballroom.jpg', TRUE),
(2, '{"en": "Conference Hall", "ar": "قاعة المؤتمرات"}', '{"en": "Modern conference facilities", "ar": "مرافق مؤتمرات حديثة"}', 'weekdays', 51.5074, -0.1278, '2345678901', 'conference@example.com', 'Jane Smith', '09:00', '18:00', 300, 3000, 200, 20, TRUE, FALSE, TRUE, FALSE, TRUE, FALSE, NOW(), NOW(), 75, 2, 2, 0.15, 'indoor', FALSE, 'Jane Smith', '456 Oak Ave', 'conference.jpg', TRUE),
(3, '{"en": "Garden Pavilion", "ar": "جناح الحديقة"}', '{"en": "Beautiful outdoor garden venue", "ar": "مكان حديقة خارجي جميل"}', 'seasonal', 52.5200, 13.4050, '3456789012', 'garden@example.com', 'Mike Johnson', '10:00', '20:00', 800, 4000, 400, 100, FALSE, FALSE, FALSE, TRUE, FALSE, TRUE, NOW(), NOW(), 50, 3, 3, 0.15, 'outdoor', FALSE, 'Mike Johnson', '789 Pine Rd', 'garden.jpg', TRUE),
(4, '{"en": "Rooftop Lounge", "ar": "صالحة السطح"}', '{"en": "Stylish rooftop with city views", "ar": "سطح أنيق بإطلالة على المدينة"}', 'evenings', 48.8566, 2.3522, '4567890123', 'rooftop@example.com', 'Sarah Williams', '17:00', '23:00', 200, 2500, 150, 30, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, NOW(), NOW(), 25, 4, 4, 0.15, 'outdoor', FALSE, 'Sarah Williams', '321 Elm Blvd', 'rooftop.jpg', TRUE),
(5, '{"en": "Exhibition Center", "ar": "مركز المعارض"}', '{"en": "Spacious hall for exhibitions", "ar": "قاعة واسعة للمعارض"}', 'weekdays', 35.6762, 139.6503, '5678901234', 'exhibition@example.com', 'David Brown', '10:00', '18:00', 1000, 6000, 500, 50, TRUE, FALSE, FALSE, FALSE, TRUE, TRUE, NOW(), NOW(), 150, 5, 5, 0.15, 'indoor', TRUE, 'David Brown', '654 Maple Ln', 'exhibition.jpg', TRUE);

-- Insert data into venue_feature table
INSERT INTO venue_feature (id, "venueId", "featureId") VALUES
(1, 1, 1), (2, 1, 2), (3, 1, 3),
(4, 2, 1), (5, 2, 4),
(6, 3, 2), (7, 3, 5),
(8, 4, 1), (9, 4, 3), (10, 4, 5),
(11, 5, 1), (12, 5, 2), (13, 5, 4);

-- Insert data into venue_equipment table
INSERT INTO venue_equipment (id, count, price, price_per, created_at, updated_at, venue_id, equipment_id) VALUES
(1, 2, 200, 'event', NOW(), NOW(), 1, 1),
(2, 4, 100, 'day', NOW(), NOW(), 1, 2),
(3, 1, 500, 'event', NOW(), NOW(), 2, 3),
(4, 10, 50, 'day', NOW(), NOW(), 3, 4),
(5, 1, 300, 'event', NOW(), NOW(), 4, 5);

-- Insert data into venue_service table
INSERT INTO venue_service (id, price, created_at, updated_at, venue_id, service_id, count) VALUES
(1, 200, NOW(), NOW(), 1, 1, 1),
(2, 300, NOW(), NOW(), 1, 2, 2),
(3, 500, NOW(), NOW(), 2, 3, 1),
(4, 250, NOW(), NOW(), 3, 4, 1),
(5, 400, NOW(), NOW(), 4, 5, 1);

-- Insert data into venue_policy table
INSERT INTO venue_policy (id, created_at, updated_at, "venueId", "policyId") VALUES
(1, NOW(), NOW(), 1, 1),
(2, NOW(), NOW(), 1, 2),
(3, NOW(), NOW(), 2, 3),
(4, NOW(), NOW(), 3, 4),
(5, NOW(), NOW(), 4, 5);

-- Insert data into venue_gallery table
INSERT INTO venue_gallery (id, venue_id, imgs, created_at, updated_at) VALUES
(1, 1, ARRAY['img1.jpg', 'img2.jpg', 'img3.jpg'], NOW(), NOW()),
(2, 2, ARRAY['img4.jpg', 'img5.jpg'], NOW(), NOW()),
(3, 3, ARRAY['img6.jpg', 'img7.jpg', 'img8.jpg'], NOW(), NOW()),
(4, 4, ARRAY['img9.jpg'], NOW(), NOW()),
(5, 5, ARRAY['img10.jpg', 'img11.jpg'], NOW(), NOW());

-- Insert data into venue_period table
INSERT INTO venue_period (id, day, "from", "to", price, venue_id, booked_dates) VALUES
(1, 'Monday', '09:00', '17:00', 1000.00, 1, ARRAY[]::text[]),
(2, 'Tuesday', '09:00', '17:00', 1000.00, 1, ARRAY[]::text[]),
(3, 'Wednesday', '09:00', '17:00', 1000.00, 1, ARRAY[]::text[]),
(4, 'Thursday', '09:00', '17:00', 1000.00, 1, ARRAY[]::text[]),
(5, 'Friday', '09:00', '17:00', 1200.00, 1, ARRAY[]::text[]),
(6, 'Saturday', '10:00', '22:00', 1500.00, 1, ARRAY[]::text[]),
(7, 'Sunday', '10:00', '22:00', 1500.00, 1, ARRAY[]::text[]);

-- Insert data into venue_packages table
INSERT INTO venue_packages (id, venue_id, package_name, package_price, start_date, end_date, created_at, updated_at, package_main_price) VALUES
(1, 1, '{"en": "Wedding Package", "ar": "باقة الزفاف"}', 5000.00, '2025-01-01 00:00:00', '2025-12-31 23:59:59', NOW(), NOW(), 5000.00),
(2, 1, '{"en": "Corporate Package", "ar": "باقة الشركات"}', 4000.00, '2025-01-01 00:00:00', '2025-12-31 23:59:59', NOW(), NOW(), 4000.00),
(3, 2, '{"en": "Conference Package", "ar": "باقة المؤتمرات"}', 3000.00, '2025-01-01 00:00:00', '2025-12-31 23:59:59', NOW(), NOW(), 3000.00),
(4, 3, '{"en": "Garden Party", "ar": "حفلة الحديقة"}', 3500.00, '2025-04-01 00:00:00', '2025-10-31 23:59:59', NOW(), NOW(), 3500.00),
(5, 4, '{"en": "Sunset Package", "ar": "باقة الغروب"}', 2500.00, '2025-01-01 00:00:00', '2025-12-31 23:59:59', NOW(), NOW(), 2500.00);

-- Insert data into venue_package_period table
INSERT INTO venue_package_period (package_id, period_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7),
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5),
(3, 1), (3, 2), (3, 3), (3, 4), (3, 5),
(4, 6), (4, 7),
(5, 6), (5, 7);

-- Insert data into venue_package_equipment table
INSERT INTO venue_package_equipment (id, count, price, created_at, updated_at, "packageId", "equipmentId") VALUES
(1, 2, 200, NOW(), NOW(), 1, 1),
(2, 4, 100, NOW(), NOW(), 1, 2),
(3, 1, 500, NOW(), NOW(), 2, 3),
(4, 10, 50, NOW(), NOW(), 3, 4),
(5, 1, 300, NOW(), NOW(), 4, 5);

-- Insert data into venue_package_service table
INSERT INTO venue_package_service (id, price, created_at, updated_at, "packageId", "serviceId", count) VALUES
(1, 200, NOW(), NOW(), 1, 1, 1),
(2, 300, NOW(), NOW(), 1, 2, 2),
(3, 500, NOW(), NOW(), 2, 3, 1),
(4, 250, NOW(), NOW(), 3, 4, 1),
(5, 400, NOW(), NOW(), 4, 5, 1);

-- Insert data into venue_calendar table
INSERT INTO venue_calendar (id, venue_id, package_name, price, date_from, date_to, created_at, updated_at) VALUES
(1, 1, '{"en": "New Year Special", "ar": "عرض رأس السنة"}', 6000.00, '2025-12-20', '2026-01-05', NOW(), NOW()),
(2, 2, '{"en": "Summer Conference", "ar": "مؤتمر الصيف"}', 3500.00, '2025-06-01', '2025-08-31', NOW(), NOW()),
(3, 3, '{"en": "Spring Garden", "ar": "حديقة الربيع"}', 4000.00, '2025-03-01', '2025-05-31', NOW(), NOW()),
(4, 4, '{"en": "Winter Rooftop", "ar": "سطح الشتاء"}', 3000.00, '2025-11-01', '2026-02-28', NOW(), NOW()),
(5, 5, '{"en": "Autumn Exhibition", "ar": "معرض الخريف"}', 5500.00, '2025-09-01', '2025-11-30', NOW(), NOW());

-- Insert data into venue_faq table
INSERT INTO venue_faq (id, question, answer, created_at, updated_at, status, venue_id, user_id) VALUES
(1, '{"en": "What is the capacity?", "ar": "ما هي السعة؟"}', '{"en": "Maximum capacity is 300 people", "ar": "الحد الأقصى للسعة هو 300 شخص"}', NOW(), NOW(), 'answered', 1, 3),
(2, '{"en": "Is parking available?", "ar": "هل يوجد موقف سيارات؟"}', '{"en": "Yes, we have free parking for 50 cars", "ar": "نعم، لدينا موقف سيارات مجاني لـ 50 سيارة"}', NOW(), NOW(), 'answered', 1, 3),
(3, '{"en": "Can we bring our own caterer?", "ar": "هل يمكننا جلب طعامنا الخاص؟"}', NULL, NOW(), NOW(), 'pending', 2, 3),
(4, '{"en": "What is the cancellation policy?", "ar": "ما هي سياسة الإلغاء؟"}', '{"en": "Full refund if cancelled 30 days in advance", "ar": "استرداد كامل إذا تم الإلغاء قبل 30 يومًا"}', NOW(), NOW(), 'answered', 3, 3),
(5, '{"en": "Do you have AV equipment?", "ar": "هل لديكم معدات الصوت والضوء؟"}', '{"en": "Yes, we provide full AV equipment", "ar": "نعم، نوفر معدات الصوت والضوء الكاملة"}', NOW(), NOW(), 'answered', 4, 3);

-- Insert data into venue_ratings table
INSERT INTO venue_ratings (id, rating, review, created_at, updated_at, venue_id, "userId") VALUES
(1, 4.5, 'Great venue for our wedding!', NOW(), NOW(), 1, 3),
(2, 3.8, 'Good conference facilities but a bit pricey', NOW(), NOW(), 2, 3),
(3, 5.0, 'Beautiful garden setting, perfect for our event', NOW(), NOW(), 3, 3),
(4, 4.2, 'Amazing views from the rooftop', NOW(), NOW(), 4, 3),
(5, 4.7, 'Spacious and well-organized for our exhibition', NOW(), NOW(), 5, 3);

-- Insert data into reservations table
INSERT INTO reservations (id, package_details, check_in, check_out, total_price, special_requests, payment_method, created_at, updated_at, "userId", "venueId", "packageId", periods, period_details, status, reservation_details) VALUES
(1, '{"package_name": "Wedding Package", "price": 5000}', '2025-06-15', '2025-06-15', 5750.00, '{"flowers": "red roses", "setup": "round tables"}', 'credit_card', NOW(), NOW(), 3, 1, 1, '["morning", "afternoon"]', '{"morning": {"from": "09:00", "to": "12:00"}, "afternoon": {"from": "13:00", "to": "17:00"}}', 'confirmed', '{"guests": 150, "notes": "Wedding ceremony"}'),
(2, '{"package_name": "Conference Package", "price": 3000}', '2025-07-20', '2025-07-21', 3450.00, '{"projector": "needed", "seating": "theater style"}', 'bank_transfer', NOW(), NOW(), 3, 2, 3, '["full_day"]', '{"full_day": {"from": "09:00", "to": "17:00"}}', 'confirmed', '{"guests": 80, "notes": "Annual company meeting"}'),
(3, '{"package_name": "Garden Party", "price": 3500}', '2025-08-10', '2025-08-10', 4025.00, '{"tent": "required in case of rain"}', 'credit_card', NOW(), NOW(), 3, 3, 4, '["evening"]', '{"evening": {"from": "18:00", "to": "22:00"}}', 'pending', '{"guests": 120, "notes": "Birthday party"}'),
(4, '{"package_name": "Sunset Package", "price": 2500}', '2025-09-05', '2025-09-05', 2875.00, '{"music": "live band", "lighting": "soft"}', 'credit_card', NOW(), NOW(), 3, 4, 5, '["evening"]', '{"evening": {"from": "19:00", "to": "23:00"}}', 'confirmed', '{"guests": 100, "notes": "Anniversary celebration"}'),
(5, '{"package_name": "Corporate Package", "price": 4000}', '2025-10-15', '2025-10-16', 4600.00, '{"breakfast": "required", "lunch": "buffet"}', 'bank_transfer', NOW(), NOW(), 3, 1, 2, '["full_day"]', '{"full_day": {"from": "08:00", "to": "18:00"}}', 'cancelled', '{"guests": 60, "notes": "Team building event"}');

-- Insert data into payment table
INSERT INTO payment (id, amount, payment_method, transaction_id, status, payment_date, created_at, updated_at, "reservationId") VALUES
(1, 5750.00, 'credit_card', 'txn_123456789', 'completed', '2025-01-15 10:30:00', NOW(), NOW(), 1),
(2, 3450.00, 'bank_transfer', 'txn_234567890', 'completed', '2025-02-20 11:45:00', NOW(), NOW(), 2),
(3, 4025.00, 'credit_card', 'txn_345678901', 'pending', '2025-03-10 09:15:00', NOW(), NOW(), 3),
(4, 2875.00, 'credit_card', 'txn_456789012', 'completed', '2025-04-05 14:20:00', NOW(), NOW(), 4),
(5, 4600.00, 'bank_transfer', 'txn_567890123', 'refunded', '2025-05-15 16:30:00', NOW(), NOW(), 5);

-- Insert data into communication table
INSERT INTO communication (id, reply, type, "reservationId", "venueId", replies, "fromId", "toId", created_at, updated_at) VALUES
(1, 'I would like to inquire about availability for June 15th', 'inquiry', 1, 1, '[]', 3, 2, NOW(), NOW()),
(2, 'We have availability on that date. Would you like to proceed?', 'reply', 1, 1,'[]', 3, 2, NOW(), NOW());











-- Insert data into contact_us table
INSERT INTO contact_us (id, name, email, phone, message, created_at, updated_at) VALUES
(1, 'John Smith', 'john.smith@example.com', '1234567890', 'I would like more information about your venue services for a corporate event.', NOW(), NOW()),
(2, 'Sarah Johnson', 'sarah.j@example.com', '2345678901', 'Do you offer wedding planning services along with venue booking?', NOW(), NOW()),
(3, 'Michael Brown', 'michael.b@example.com', NULL, 'I have a complaint about my recent experience with your booking system.', NOW(), NOW()),
(4, 'Emily Davis', 'emily.d@example.com', '3456789012', 'Looking for partnership opportunities with your venue platform.', NOW(), NOW()),
(5, 'David Wilson', 'david.w@example.com', '4567890123', 'Request for bulk booking discounts for multiple events.', NOW(), NOW());

-- Insert data into letter table
INSERT INTO letter (id, title, content, created_at, updated_at) VALUES
(1, 'Welcome to Our Platform', 'Dear valued customer, thank you for joining our platform...', NOW(), NOW()),
(2, 'Upcoming Maintenance Notice', 'We will be performing system maintenance on...', NOW(), NOW()),
(3, 'New Features Announcement', 'We are excited to announce several new features...', NOW(), NOW()),
(4, 'Special Promotion', 'For a limited time, enjoy 15% off all venue bookings...', NOW(), NOW()),
(5, 'Important Policy Update', 'Please review our updated terms and conditions...', NOW(), NOW());

-- Insert data into letters table
INSERT INTO letters (id, email, created_at) VALUES
(1, 'subscriber1@example.com', NOW()),
(2, 'subscriber2@example.com', NOW()),
(3, 'subscriber3@example.com', NOW()),
(4, 'subscriber4@example.com', NOW()),
(5, 'subscriber5@example.com', NOW());


-- Insert data into home_settings table
INSERT INTO home_settings (id, "titleHome", "secondTitleHome", "urlVideo", "specialVenues", "bestRatedVenues", "termsAndCondition", "dataPrivacy", "necessaryLaws", faqs, policies, "socialMedia", created_at, updated_at) VALUES
(1, 
 '{"en": "Find Your Perfect Venue", "ar": "ابحث عن مكانك المثالي"}', 
 '{"en": "Book unique spaces for any occasion", "ar": "احجز مساحات فريدة لأي مناسبة"}',
 'https://example.com/video.mp4',
 '1,2,3',
 '4,5',
 '{"en": "By using our service you agree to our terms...", "ar": "باستخدام خدمتنا فإنك توافق على شروطنا..."}',
 '{"en": "We respect your privacy...", "ar": "نحن نحترم خصوصيتك..."}',
 '{"en": "All bookings subject to local laws...", "ar": "جميع الحجوزات تخضع للقوانين المحلية..."}',
 '[{"question": {"en": "How do I book?", "ar": "كيف أحجز؟"}, "answer": {"en": "Select venue and dates...", "ar": "اختر المكان والتواريخ..."}}]',
 '[{"title": {"en": "Cancellation", "ar": "الإلغاء"}, "content": {"en": "30 days notice required...", "ar": "يجب إخطار قبل 30 يومًا..."}}]',
 '{"facebook": "https://facebook.com", "twitter": "https://twitter.com", "instagram": "https://instagram.com"}',
 NOW(), NOW());

-- Insert data into user_notification table
INSERT INTO user_notification (id, type, message, is_read, redirectable_id, redirectable_type, created_at, updated_at, "userId") VALUES
(1, 'booking_confirmation', 'Your booking for Grand Ballroom has been confirmed', TRUE, 1, 'reservation', NOW(), NOW(), 3),
(2, 'payment_received', 'Payment received for reservation #2', TRUE, 2, 'reservation', NOW(), NOW(), 3),
(3, 'booking_reminder', 'Reminder: Your event at Garden Pavilion is tomorrow', FALSE, 3, 'reservation', NOW(), NOW(), 3),
(4, 'new_message', 'You have a new message regarding your inquiry', FALSE, NULL, NULL, NOW(), NOW(), 3),
(5, 'review_request', 'Please rate your recent experience at Rooftop Lounge', TRUE, 4, 'reservation', NOW(), NOW(), 3);

-- Reset all sequences to avoid conflicts with future inse
SELECT setval('city_id_seq', (SELECT MAX(id) FROM city));
SELECT setval('communication_id_seq', (SELECT MAX(id) FROM communication));
SELECT setval('contact_us_id_seq', (SELECT MAX(id) FROM contact_us));
SELECT setval('countries_id_seq', (SELECT MAX(id) FROM countries));
SELECT setval('equipment_id_seq', (SELECT MAX(id) FROM equipment));
SELECT setval('fcm_id_seq', (SELECT MAX(id) FROM fcm));
SELECT setval('feature_id_seq', (SELECT MAX(id) FROM feature));
SELECT setval('home_settings_id_seq', (SELECT MAX(id) FROM home_settings));
SELECT setval('letter_id_seq', (SELECT MAX(id) FROM letter));
SELECT setval('letters_id_seq', (SELECT MAX(id) FROM letters));
SELECT setval('media_id_seq', (SELECT MAX(id) FROM media));
SELECT setval('occasion_type_id_seq', (SELECT MAX(id) FROM occasion_type));
SELECT setval('otp_id_seq', (SELECT MAX(id) FROM otp));
SELECT setval('payment_id_seq', (SELECT MAX(id) FROM payment));
SELECT setval('permissions_id_seq', (SELECT MAX(id) FROM permissions));
SELECT setval('policy_id_seq', (SELECT MAX(id) FROM policy));
SELECT setval('property_id_seq', (SELECT MAX(id) FROM property));
SELECT setval('reservations_id_seq', (SELECT MAX(id) FROM reservations));
SELECT setval('role_permissions_id_seq', (SELECT MAX(id) FROM role_permissions));
SELECT setval('roles_id_seq', (SELECT MAX(id) FROM roles));
SELECT setval('service_id_seq', (SELECT MAX(id) FROM service));
SELECT setval('user_id_seq', (SELECT MAX(id) FROM "user"));
SELECT setval('user_notification_id_seq', (SELECT MAX(id) FROM user_notification));
SELECT setval('venue_id_seq', (SELECT MAX(id) FROM venue));
SELECT setval('venue_calendar_id_seq', (SELECT MAX(id) FROM venue_calendar));
SELECT setval('venue_equipment_id_seq', (SELECT MAX(id) FROM venue_equipment));
SELECT setval('venue_faq_id_seq', (SELECT MAX(id) FROM venue_faq));
SELECT setval('venue_feature_id_seq', (SELECT MAX(id) FROM venue_feature));
SELECT setval('venue_gallery_id_seq', (SELECT MAX(id) FROM venue_gallery));
SELECT setval('venue_package_equipment_id_seq', (SELECT MAX(id) FROM venue_package_equipment));
SELECT setval('venue_package_service_id_seq', (SELECT MAX(id) FROM venue_package_service));
SELECT setval('venue_packages_id_seq', (SELECT MAX(id) FROM venue_packages));
SELECT setval('venue_period_id_seq', (SELECT MAX(id) FROM venue_period));
SELECT setval('venue_policy_id_seq', (SELECT MAX(id) FROM venue_policy));
SELECT setval('venue_ratings_id_seq', (SELECT MAX(id) FROM venue_ratings));
SELECT setval('venue_service_id_seq', (SELECT MAX(id) FROM venue_service));


*/