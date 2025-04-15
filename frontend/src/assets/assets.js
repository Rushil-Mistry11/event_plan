import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import profile_pic from './profile_pic.png'
import upload_icon from './upload_icon.png'
import venue1 from './venue1.jpg'
import venue2 from './venue2.jpg'
import venue3 from './venue3.jpg'
import venue4 from './venue4.jpg'
import caterer1 from './caterer1.jpg'
import caterer2 from './caterer2.jpg'
import caterer3 from './caterer3.jpg'
import deco1 from './deco1.jpg'
import deco2 from './deco2.jpg'
import music1 from './music1.jpg'
import music2 from './music2.jpeg'
import photo1 from './photo1.jpg'
import photo2 from './photo2.png'
import photo3 from './photo3.jpg'
import home from './home.jpg'
import logo1 from './logo1.png'
import group_profiles from './group_profiles.png'
import gallery9 from './gallery9.jpg'
import venue from './venue.jpg'
import caterer from './caterer.jpg'
import decorator from './decorator.jpg'
import inv from './inv.jpg'
import music from './music.jpg'
import photo from './photo.png'
import info_icon from './info_icon.svg'
import gallery6 from './gallery6.jpg'

export const assets = {
    chats_icon,
    verified_icon,
    arrow_icon,
    menu_icon,
    cross_icon,
    dropdown_icon,
    home,
    logo1,
    profile_pic,
    group_profiles,
    gallery9,
    venue,
    caterer,
    inv,
    photo,
    decorator,
    music,
    info_icon,
    gallery6,
    upload_icon
}

export const specialityData = [
    {
        speciality: 'Venue selection',
        image: venue
    },
    {
        speciality: 'Caterers',
        image: caterer
    },
    {
        speciality: 'Decorators',
        image: decorator
    },
    {
        speciality: 'Entertainment',
        image: music
    },
    {
        speciality: 'Photography',
        image: photo
    },
]

export const vendors = [
    {
        _id: 'Venue1',
        name: 'Awesome hall',
        image: venue1,
        speciality: 'Venue selection',
        about: 'Welcome to The Grand Hall, a sophisticated and spacious venue designed to make every event unforgettable. Nestled in a prime location, our hall offers the perfect blend of elegance and versatility, ideal for weddings, corporate functions, birthday celebrations, and social gatherings.',
        prices: 25000,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, Ahmedabad'
        }
    },
    {
        _id: 'Venue2',
        name: 'Green Meadows Party plot',
        image: venue2,
        speciality: 'Venue selection',
        about: 'Welcome to Green Meadows Party Plot, an expansive open-air venue designed to host lifes most cherished celebrations under the stars. Located in a serene setting away from the city’s hustle, our party plot offers the perfect blend of natural beauty and modern amenities.',
        prices: 35000,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, CG Road, Ahmedabad'
        }
    },
    {
        _id: 'Venue3',
        name: 'Sunset Garden Party Plot',
        image: venue3,
        speciality: 'Venue selection',
        about: 'Introducing Sunset Garden Party Plot  where open skies, elegant landscaping, and unforgettable celebrations come together. Perfect for weddings, engagements, receptions, festive functions, and social events, our venue offers a stunning outdoor space thats both charming and customizable.',
        prices: 25000,
        address: {
            line1: '19th Cross, Richmond',
            line2: 'Circle,Sindhubhavan Road, Ahmedabad'
        }
    },
    {
        _id: 'Venue4',
        name: 'Riverside Elegance Hall',
        image: venue4,
        speciality: 'Venue selection',
        about: 'Welcome to Riverside Elegance Hall, a breathtaking venue where nature meets sophistication. Located along the tranquil banks of the riverfront, this picturesque space offers a one-of-a-kind setting for unforgettable celebrations and events.',
        prices: 15000,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle,Riverfront, Ahmedabad'
        }
    },
    {
        _id: 'caterer1',
        name: 'Flavour & Fork Caterers',
        image: caterer1,
        speciality: 'Caterers',
        about: 'At Flavour & Fork Caterers, we believe that great food brings people together—and we are passionate about making every event deliciously memorable. With years of experience in catering weddings, corporate events, private parties, and festive celebrations, our team delivers a perfect blend of taste, presentation, and service.',
        prices: 15000,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle,Riverfront, Ahmedabad'
        }
    },
    {
        _id: 'caterer2',
        name: 'Royal Plate Catering',
        image: caterer2,
        speciality: 'Caterers',
        about: 'Welcome to Royal Plate Catering, where culinary artistry meets flawless service. Specializing in premium catering for weddings, upscale corporate events, and luxury celebrations, we curate unforgettable dining experiences that delight the senses.',
        prices: 15000,
        address: {
            line1: '19th Cross, Richmond',
            line2: 'Circle,Sindhubhavan Road, Ahmedabad'
        }
    },
    {
        _id: 'caterer3',
        name: 'HomeTaste Caterers',
        image: caterer3,
        speciality: 'Caterers',
        about: 'At HomeTaste Caterers, we bring the warmth of homemade flavors to your most special occasions. Whether its a wedding, birthday, festival, or community gathering, our food reflects comfort, tradition, and heartfelt hospitality.',
        prices: 15000,
        address: {
            line1: '20th Cross, Richmond',
            line2: 'Circle,Sindhubhavan Road, Ahmedabad'
        }
    },
    {
        _id: 'deco1',
        name: 'DreamCanvas Events & Decor',
        image: deco1,
        speciality: 'Decorators',
        about: 'Welcome to DreamCanvas Events & Decor, where creativity meets celebration! We specialize in transforming spaces into stunning, Instagram-worthy experiences tailored to your events style, theme, and vibe.',
        prices: 25000,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle,Riverfront, Ahmedabad'
        }
    },
    {
        _id: 'deco2',
        name: 'Royal Touch Decorators',
        image: deco2,
        speciality: 'Decorators',
        about: 'At Royal Touch Decorators, we turn your celebrations into timeless masterpieces. With a strong foundation in traditional elegance and years of experience in wedding and event styling, our team brings grace, detail, and grandeur to every occasion.',
        prices: 25000,
        address: {
            line1: '20th Cross, opposite Shott',
            line2: 'Circle,Sindhubhavan Road, Ahmedabad'
        }
    },
    {
        _id: 'music1',
        name: 'Vibe Beats Entertainment',
        image: music1,
        speciality: 'Entertainment',
        about: 'Welcome to Vibe Beats Entertainment, your go-to music company for electrifying events and unforgettable celebrations! We specialize in curating high-energy musical experiences for weddings, parties, corporate events, and festivals.',
        prices: 25000,
        address: {
            line1: '17th Cross, kankaria lake',
            line2: 'Circle,Riverfront, Ahmedabad'
        }
    },
    {
        _id: 'music2',
        name: 'Harmony Events & Music Co.',
        image: music2,
        speciality: 'Entertainment',
        about: 'At Harmony Events & Music Co., we believe that music sets the tone for every great celebration. With a team of skilled musicians, vocalists, DJs, and sound engineers, we provide tailored music solutions for weddings, receptions, corporate events, cultural functions, and more.',
        prices: 25000,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle,S.G Highway, Ahmedabad'
        }
    },
    {
        _id: 'photo1',
        name: 'Lens & Love Studios',
        image: photo1,
        speciality: 'Photography',
        about: 'Welcome to Lens & Love Studios, where your moments become timeless stories. We specialize in cinematic wedding photography and heartfelt event coverage that captures every glance, smile, and emotion just as it happens.',
        prices: 15000,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle,Riverfront, Ahmedabad'
        }
    },
    {
        _id: 'photo2',
        name: 'FlashFrame Photography',
        image: photo2,
        speciality: 'Photography',
        about: 'At FlashFrame Photography, we bring energy, creativity, and color to every celebration. Known for our vibrant edits, candid shots, and trendy storytelling style, we turn events into highlight reels that pop.',
        prices: 35000,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle,S.G Highway, Ahmedabad'
        }
    },
    {
        _id: 'photo3',
        name: 'FocusCraft Photography',
        image: photo3,
        speciality: 'Photography',
        about: 'Welcome to FocusCraft Photography, your trusted partner for professional event coverage. With years of experience and a team of skilled photographers and videographers, we offer end-to-end photography solutions for weddings, corporate events, pre-wedding shoots, and more.',
        prices: 25000,
        address: {
            line1: '19th Cross, Richmond',
            line2: 'Circle,Sindhubhavan Road, Ahmedabad'
        }
    },
]