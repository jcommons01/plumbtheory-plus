import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// ✅ Bricklaying Level 3 Setting Out for Complex Projects Questions
const questions = [
  {
    id: 'bricklaying-l3-topic5-1',
    question: "What is the primary purpose of setting out a complex masonry project?",
    options: ["To estimate material quantities only", "To establish accurate reference points and lines for the position and dimensions of the structure", "To identify project timelines", "To assign work to different team members"],
    correctAnswer: "To establish accurate reference points and lines for the position and dimensions of the structure",
    explanation: "Setting out a complex masonry project establishes accurate reference points and lines for the structure's position and dimensions. This process creates a physical representation of the design drawings on site, ensuring all elements are positioned correctly. Proper setting out prevents costly errors, maintains design integrity, and provides reference points for ongoing accuracy checks throughout construction."
  },
  {
    id: 'bricklaying-l3-topic5-2',
    question: "What is a 'datum point' in setting out?",
    options: ["The center point of a circular structure", "A fixed reference point of known position and height from which measurements are taken", "The point where work will begin", "The highest point of the structure"],
    correctAnswer: "A fixed reference point of known position and height from which measurements are taken",
    explanation: "A datum point is a fixed reference point of known position and height from which measurements are taken. For complex masonry projects, the datum provides a consistent baseline for all vertical measurements, ensuring accurate levels throughout construction. Multiple datums may be established across larger sites, all relating back to the primary datum. These points must be protected from disturbance throughout the project."
  },
  {
    id: 'bricklaying-l3-topic5-3',
    question: "What is a 'theodolite' used for in setting out complex structures?",
    options: ["Measuring material quantities", "Testing mortar consistency", "Precisely measuring horizontal and vertical angles", "Checking mortar joint thickness"],
    correctAnswer: "Precisely measuring horizontal and vertical angles",
    explanation: "A theodolite precisely measures horizontal and vertical angles in setting out complex structures. This precision optical instrument helps establish accurate reference lines and points, particularly useful for setting out curved walls, irregular shapes, and ensuring alignment across large distances. Modern electronic theodolites (total stations) can also measure distances and calculate coordinates, making them invaluable for complex masonry layouts requiring high precision."
  },
  {
    id: 'bricklaying-l3-topic5-4',
    question: "What is 'triangulation' in the context of setting out?",
    options: ["Creating triangle-shaped structures", "Using three measurements to fix a position", "Dividing the site into triangular sections", "Setting out three buildings simultaneously"],
    correctAnswer: "Using three measurements to fix a position",
    explanation: "Triangulation uses three measurements to fix a position in setting out. This method locates points by measuring distances or angles from two known points, creating a triangle. It's particularly useful for complex site layouts where direct measurement between points is difficult. For irregular masonry structures, triangulation helps verify positions by providing mathematical checks through multiple reference points, ensuring accuracy even in challenging layouts."
  },
  {
    id: 'bricklaying-l3-topic5-5',
    question: "What is a 'total station' in modern setting out?",
    options: ["A complete mortar mixing station", "An electronic theodolite with integrated distance measurement", "The main site office", "A multi-purpose tool storage area"],
    correctAnswer: "An electronic theodolite with integrated distance measurement",
    explanation: "A total station is an electronic theodolite with integrated distance measurement. This advanced instrument combines angle measurement capabilities with electronic distance measurement (EDM) technology. For complex masonry projects, total stations calculate coordinates from angle and distance data, store information digitally, and transfer data to computers. This enables precise setting out of intricate designs, curved elements, and complex geometries with millimeter precision."
  },
  {
    id: 'bricklaying-l3-topic5-6',
    question: "When setting out a curved wall, what is the importance of establishing the 'radius point'?",
    options: ["It determines the mortar color to be used", "It determines wall height only", "It's the fixed point from which the curve is measured, ensuring accurate curvature", "It indicates where windows should be positioned"],
    correctAnswer: "It's the fixed point from which the curve is measured, ensuring accurate curvature",
    explanation: "The radius point is the fixed point from which a curve is measured, ensuring accurate curvature. For curved masonry walls, precisely establishing this point is critical as all measurements derive from it. The radius point must be clearly marked and protected throughout construction. Methods for marking curves from this point include using a trammel (a rigid arm pivoting around the radius point), string lines of fixed length, or coordinate settings with a total station."
  },
  {
    id: 'bricklaying-l3-topic5-7',
    question: "What is the purpose of 'profile boards' in setting out masonry structures?",
    options: ["To display worker qualifications", "To provide information about brick profiles being used", "To establish and maintain line, level and position of masonry features", "To advertise the construction company"],
    correctAnswer: "To establish and maintain line, level and position of masonry features",
    explanation: "Profile boards establish and maintain line, level, and position of masonry features. These robust frames, set beyond the construction area, hold taut strings that project wall positions and levels. For complex structures, profiles indicate critical points like wall intersections, openings, and level changes. They provide ongoing reference points throughout construction, allowing consistent checking and correction of the work as it progresses."
  },
  {
    id: 'bricklaying-l3-topic5-8',
    question: "What is the '3-4-5 method' used for in setting out?",
    options: ["Calculating material requirements", "Creating triangular structures", "Establishing a perfect right angle", "Determining mortar proportions"],
    correctAnswer: "Establishing a perfect right angle",
    explanation: "The 3-4-5 method establishes a perfect right angle in setting out. Based on the Pythagorean theorem, it creates a right-angled triangle with sides measuring 3, 4, and 5 units. On site, this might be implemented as 3m, 4m, and 5m or proportionally larger measurements. For complex masonry projects, this simple but accurate method ensures corners are precisely 90 degrees, providing a reliable foundation for subsequent setting out."
  },
  {
    id: 'bricklaying-l3-topic5-9',
    question: "What information would you typically find on a setting out drawing for a complex masonry project?",
    options: ["Only wall thicknesses", "Only material specifications", "Dimensions, coordinates, levels, angles and other positioning information", "Only construction timelines"],
    correctAnswer: "Dimensions, coordinates, levels, angles and other positioning information",
    explanation: "Setting out drawings for complex masonry projects include dimensions, coordinates, levels, angles, and other positioning information. These specialized drawings provide the data needed to accurately transfer the design to the site. They often include grid lines, key dimensions from fixed points, level information relative to established datums, and critical angles for non-orthogonal elements. For curved or irregular structures, they may include coordinate tables or radius information."
  },
  {
    id: 'bricklaying-l3-topic5-10',
    question: "What is the purpose of 'grid lines' in setting out complex structures?",
    options: ["To create decorative patterns in the brickwork", "To designate areas for different brick colors", "To provide reference lines for accurately positioning building elements", "To indicate where to place mortar mixing stations"],
    correctAnswer: "To provide reference lines for accurately positioning building elements",
    explanation: "Grid lines provide reference lines for accurately positioning building elements. These perpendicular lines form a coordinate system across the site, typically labeled with letters in one direction and numbers in the other. For complex masonry projects, grid lines offer consistent reference points for locating walls, columns, and features. Measurements from these known lines simplify positioning, especially for irregular shapes or when working from existing structures."
  },
  {
    id: 'bricklaying-l3-topic5-11',
    question: "What is the most appropriate instrument for transferring levels accurately across a large masonry project?",
    options: ["Spirit level", "Plumb bob", "Optical or laser level", "Measuring tape"],
    correctAnswer: "Optical or laser level",
    explanation: "An optical or laser level is most appropriate for transferring levels accurately across large masonry projects. These instruments project a perfectly horizontal line or plane across considerable distances without the cumulative errors of spirit levels. Modern rotating laser levels can establish level references across entire sites simultaneously. For complex masonry with multiple level changes, datum points established with these instruments ensure vertical consistency throughout the structure."
  },
  {
    id: 'bricklaying-l3-topic5-12',
    question: "When setting out an elliptical arch, what is the 'trammel method'?",
    options: ["Using a specialized measuring tape", "A technique using a sliding rod with fixed pins to trace an ellipse", "Using pre-fabricated templates", "A method of calculating brick quantities for arches"],
    correctAnswer: "A technique using a sliding rod with fixed pins to trace an ellipse",
    explanation: "The trammel method is a technique using a sliding rod with fixed pins to trace an ellipse. For setting out elliptical masonry arches, it involves a rod with a marking point and two sliding points that follow guide tracks positioned at the foci of the ellipse. As the rod moves, the marking point traces a perfect elliptical curve. This traditional method provides high accuracy for setting out elliptical forms in complex masonry projects."
  },
  {
    id: 'bricklaying-l3-topic5-13',
    question: "What is the function of a 'site benchmark' in setting out?",
    options: ["A place for workers to sit and rest", "A market comparison for material costs", "A permanent reference point with a known height above sea level", "A mark showing the highest point of the building"],
    correctAnswer: "A permanent reference point with a known height above sea level",
    explanation: "A site benchmark is a permanent reference point with a known height above sea level. All vertical measurements and levels throughout the project are related back to this established benchmark. For complex masonry projects with multiple level changes, the benchmark ensures consistent height references. It's often related to an Ordnance Survey benchmark or other officially recognized datum, providing absolute rather than relative height information."
  },
  {
    id: 'bricklaying-l3-topic5-14',
    question: "What is the 'coordinate method' of setting out?",
    options: ["Assigning specific tasks to different team members", "Using grid references or X-Y coordinates to position building elements", "Coordinating deliveries of materials", "Setting out multiple buildings simultaneously"],
    correctAnswer: "Using grid references or X-Y coordinates to position building elements",
    explanation: "The coordinate method uses grid references or X-Y coordinates to position building elements. This precise approach locates points by their distance along two perpendicular axes from an established origin point. For complex masonry structures with irregular shapes, the coordinate method provides exact positioning of critical points. Modern total stations and digital setting out tools use this method, translating design coordinates directly to physical locations on site."
  },
  {
    id: 'bricklaying-l3-topic5-15',
    question: "What is a 'traveller' in traditional masonry setting out?",
    options: ["A worker who moves between different sites", "A template cut to match a specific profile for checking work", "A type of measuring device", "A temporary support structure"],
    correctAnswer: "A template cut to match a specific profile for checking work",
    explanation: "A traveller in traditional masonry setting out is a template cut to match a specific profile for checking work. Typically made from durable material like hardwood or sheet metal, the traveller transfers complex shapes from drawings to the actual construction. For curved walls, arches, or moldings, a traveller ensures consistency by allowing bricklayers to regularly check the developing profile against the template. Multiple travellers may be used for different sections of complex features."
  },
  {
    id: 'bricklaying-l3-topic5-16',
    question: "When setting out a circular masonry feature, what is the 'trammel arm' method?",
    options: ["Using your arm as a measuring tool", "A rotating arm of fixed length pivoted at the center point to mark the circumference", "A special technique for lifting circular stones", "A method requiring two workers with outstretched arms"],
    correctAnswer: "A rotating arm of fixed length pivoted at the center point to mark the circumference",
    explanation: "The trammel arm method uses a rotating arm of fixed length pivoted at the center point to mark the circumference. For circular masonry features, this simple but effective technique ensures a perfect circle by maintaining a constant radius from the center. The arm can mark the circle directly or indicate positions for profile boards. For permanent reference, markers or profiles are established at key intervals around the circumference before construction begins."
  },
  {
    id: 'bricklaying-l3-topic5-17',
    question: "What is meant by 'working to face' in masonry setting out?",
    options: ["Working on the visible surface of the wall only", "Setting out from the finished face of the masonry rather than the structural line", "Facing toward the work while setting out", "Setting out the facing bricks differently from backing bricks"],
    correctAnswer: "Setting out from the finished face of the masonry rather than the structural line",
    explanation: "Working to face means setting out from the finished face of the masonry rather than the structural line. This approach focuses on the visual appearance of the completed work, ensuring that key features align perfectly on the visible face. For complex projects with architectural emphasis on appearance, working to face helps manage dimensional variations in materials while maintaining precise external alignments and ensuring aesthetically critical elements like openings, features, and corners appear exactly as designed."
  },
  {
    id: 'bricklaying-l3-topic5-18',
    question: "What is the purpose of 'booking dimensions' in setting out?",
    options: ["Reserving materials by dimension", "Recording measurements methodically to prevent errors", "Arranging for dimensional lumber delivery", "Establishing the dimensions of the site office"],
    correctAnswer: "Recording measurements methodically to prevent errors",
    explanation: "Booking dimensions involves recording measurements methodically to prevent errors. For complex masonry projects, this systematic documentation process creates a clear record of all key dimensions, reducing mistakes when transferring measurements from drawings to site. The booked dimensions typically follow a consistent format from established reference points, with clear notation of what each measurement represents. This methodical approach is especially important when setting out irregular or complex features."
  },
  {
    id: 'bricklaying-l3-topic5-19',
    question: "When setting out a bay window, why is it important to accurately establish the projection from the main wall face?",
    options: ["To calculate material quantities only", "To ensure the bay fits proportionally with the elevation and aligns with internal floor space", "It only affects the appearance, not the function", "The projection is arbitrary and can be adjusted during construction"],
    correctAnswer: "To ensure the bay fits proportionally with the elevation and aligns with internal floor space",
    explanation: "When setting out a bay window, accurately establishing the projection from the main wall face ensures the bay fits proportionally with the elevation and aligns with internal floor space. The projection affects both external appearance and internal functionality, including furniture placement and circulation space. Precise setting out of the projection also ensures proper roof junction details and drainage. For complex bay designs with multiple angles, accurate projection measurement forms the foundation for all subsequent dimensional relationships."
  },
  {
    id: 'bricklaying-l3-topic5-20',
    question: "What is a 'string line gauge' used for in masonry setting out?",
    options: ["Measuring the tension in string lines", "Ensuring consistent brick coursing heights", "Testing the strength of string", "Measuring the length of string required"],
    correctAnswer: "Ensuring consistent brick coursing heights",
    explanation: "A string line gauge ensures consistent brick coursing heights in masonry setting out. This simple tool, typically made from wood or metal, has notches marked at standard course heights. When placed against profiles or reference points, it allows quick, accurate positioning of multiple string lines at precise vertical intervals. For complex projects with numerous course heights to set out, the gauge eliminates cumulative measurement errors and speeds up the process of establishing level lines."
  },
  {
    id: 'bricklaying-l3-topic5-21',
    question: "What is the significance of establishing 'face planes' when setting out complex brickwork?",
    options: ["Determining which side of the brick to expose", "Establishing the vertical flat surfaces that define the main faces of the structure", "Choosing which bricklayers will work on visible areas", "Setting out areas where special face bricks will be used"],
    correctAnswer: "Establishing the vertical flat surfaces that define the main faces of the structure",
    explanation: "Establishing face planes means defining the vertical flat surfaces that form the main faces of the structure. For complex brickwork with multiple wall planes at different angles or surfaces that step in and out, clearly establishing these planes during setting out is critical. Face planes provide the primary references for alignment, helping control wall straightness and ensuring proper relationships between different elements. They serve as the key reference for all projections, recesses, and returns in the masonry."
  },
  {
    id: 'bricklaying-l3-topic5-22',
    question: "What is the purpose of a 'story rod' in traditional masonry setting out?",
    options: ["To tell stories to junior bricklayers", "A measuring stick marked with course heights to ensure consistent coursing", "To support string lines", "To check the verticality of corners"],
    correctAnswer: "A measuring stick marked with course heights to ensure consistent coursing",
    explanation: "A story rod is a measuring stick marked with course heights to ensure consistent coursing. Typically made from straight timber or metal, it's precisely marked with the positions of each course, accounting for brick height and mortar joints. For complex projects with multiple levels or varying coursing patterns, the story rod provides a physical reference that maintains consistency across the project and helps coordinate coursing at critical junctions."
  },
  {
    id: 'bricklaying-l3-topic5-23',
    question: "What is the process of 'normalizing' dimensions in setting out?",
    options: ["Making all dimensions comply with building regulations", "Adjusting theoretical dimensions to practical workable dimensions that suit the materials being used", "Converting imperial measurements to metric", "Reducing all dimensions to fit on a smaller site"],
    correctAnswer: "Adjusting theoretical dimensions to practical workable dimensions that suit the materials being used",
    explanation: "Normalizing dimensions involves adjusting theoretical dimensions to practical workable dimensions that suit the materials being used. For masonry, this typically means adjusting setting-out dimensions to accommodate full bricks plus standard joint thicknesses, avoiding awkward cuts. This process reconciles design intentions with the constraints of modular materials, ensuring efficient construction while maintaining visual intent. Normalized dimensions are particularly important around openings and at wall intersections in complex structures."
  },
  {
    id: 'bricklaying-l3-topic5-24',
    question: "What is the purpose of establishing 'running dimensions' in setting out complex masonry?",
    options: ["Dimensions for areas where people will run", "Sequential cumulative measurements from a fixed starting point", "Dimensions that change over time", "The speed at which the project should progress"],
    correctAnswer: "Sequential cumulative measurements from a fixed starting point",
    explanation: "Running dimensions are sequential cumulative measurements from a fixed starting point. This approach reduces cumulative errors that can occur when adding multiple individual dimensions. For complex masonry projects, running dimensions provide a consistent reference system, with each critical point measured from the established baseline rather than from the previous point. This technique is particularly valuable for setting out irregular features or ensuring precision across long wall runs."
  },
  {
    id: 'bricklaying-l3-topic5-25',
    question: "What is a 'laser plummet' used for in setting out?",
    options: ["Checking if plumbing pipes are installed correctly", "Projecting a point directly above or below another point", "Measuring the laser content of mortar", "Cutting bricks with a laser"],
    correctAnswer: "Projecting a point directly above or below another point",
    explanation: "A laser plummet projects a point directly above or below another point. This precision instrument uses laser technology to establish a perfect vertical line, transferring points vertically with high accuracy. For complex multi-story masonry projects, it ensures features align precisely between floors. It's particularly useful for setting out complex structures where traditional plumb bobs might be affected by wind or where extended height makes conventional methods difficult."
  },
  {
    id: 'bricklaying-l3-topic5-26',
    question: "What are 'offset lines' in the context of setting out?",
    options: ["Decorative brick patterns", "Lines drawn parallel to the actual wall line at a specific distance away", "Lines that are slightly misaligned", "Guidelines for parking on site"],
    correctAnswer: "Lines drawn parallel to the actual wall line at a specific distance away",
    explanation: "Offset lines are drawn parallel to the actual wall line at a specific distance away. This technique establishes reference lines outside the construction area, protecting them from disturbance during work. For complex masonry projects, working with offset lines keeps the setting out intact throughout construction. The offset distance is clearly recorded, allowing accurate positioning of actual wall lines when needed. This method is particularly valuable when setting out large structures or when working space is limited."
  },
  {
    id: 'bricklaying-l3-topic5-27',
    question: "What is meant by 'building in to the line' in bricklaying?",
    options: ["Incorporating string lines into the mortar joints", "Placing special bricks along string lines", "Constructing the masonry exactly to the string line without the line touching the bricks", "Adding reinforcement along straight lines"],
    correctAnswer: "Constructing the masonry exactly to the string line without the line touching the bricks",
    explanation: "Building in to the line means constructing masonry exactly to the string line without the line touching the bricks. This technique requires skilled judgment to position bricks precisely aligned with but not touching the line, maintaining its tension and accuracy. For complex projects, this approach ensures walls follow the intended line exactly while preserving the reference line for ongoing use. It requires experience to consistently judge the correct brick position relative to the line."
  },
  {
    id: 'bricklaying-l3-topic5-28',
    question: "What is the purpose of a 'setting out nail' in masonry work?",
    options: ["A nail used to repair damaged brick", "A temporary marker driven into the ground or fixed to timber to hold string lines", "A specific nail size used only for setting out", "A nail used to fix profile boards"],
    correctAnswer: "A temporary marker driven into the ground or fixed to timber to hold string lines",
    explanation: "A setting out nail is a temporary marker driven into the ground or fixed to timber to hold string lines. These sturdy nails provide secure anchor points for the precise string lines that guide construction. For complex masonry setting out, the exact positioning of these nails is critical as they physically define the layout. They're typically driven into the ground for groundwork setting out or into profile boards for wall setting out, creating a network of reference points across the site."
  },
  {
    id: 'bricklaying-l3-topic5-29',
    question: "In setting out an arch, what is the 'springing line'?",
    options: ["A flexible measuring tape", "The horizontal line from which the arch begins to curve", "A line showing the structural support", "The center line of the arch"],
    correctAnswer: "The horizontal line from which the arch begins to curve",
    explanation: "The springing line is the horizontal line from which an arch begins to curve. Accurately establishing this line during setting out is critical for proper arch geometry. For complex archways, precisely setting out the springing line at the same height on both supports ensures the arch rises symmetrically. This reference line determines where straight walling ends and the curved arch structure begins, influencing both the structural behavior and appearance of the completed arch."
  },
  {
    id: 'bricklaying-l3-topic5-30',
    question: "When setting out for a curved wall, why might you use 'chord dimensions' rather than arc measurements?",
    options: ["They're easier to play on a piano", "They're more visually appealing", "They're easier to mark out and measure accurately on site using straight measuring tools", "They use less string when setting out"],
    correctAnswer: "They're easier to mark out and measure accurately on site using straight measuring tools",
    explanation: "When setting out curved walls, chord dimensions are used because they're easier to mark out and measure accurately on site using straight measuring tools. While arc measurements follow the curve itself, chord dimensions are straight lines connecting points along the curve. For complex curved masonry, setting out using a series of chords with known lengths and angles provides a practical way to establish the curve using conventional measuring equipment. This technique translates the theoretical curved design into a workable setting-out approach."
  },
  {
    id: 'bricklaying-l3-topic5-31',
    question: "When setting out a building with irregular angles, what is the advantage of using a 'total station'?",
    options: ["It automatically orders the correct bricks", "It precisely measures both angles and distances, calculating coordinates for complex geometries", "It's completely waterproof for all weather conditions", "It automatically builds corners without manual labor"],
    correctAnswer: "It precisely measures both angles and distances, calculating coordinates for complex geometries",
    explanation: "When setting out buildings with irregular angles, a total station's advantage is precisely measuring both angles and distances, calculating coordinates for complex geometries. This electronic instrument combines theodolite capabilities with distance measurement, allowing accurate positioning of points in three dimensions. For complex masonry with non-standard angles, total stations calculate and set out precise coordinates from the design, ensuring accurate replication of intricate geometries that would be challenging to establish using conventional methods."
  },
  {
    id: 'bricklaying-l3-topic5-32',
    question: "What is the purpose of a 'profile board offset' in setting out?",
    options: ["A decorative feature on profile boards", "The distance profile boards are set away from actual wall lines to allow for construction clearance", "A technique for making profile boards more visible", "The height difference between different profile boards"],
    correctAnswer: "The distance profile boards are set away from actual wall lines to allow for construction clearance",
    explanation: "A profile board offset is the distance profile boards are set away from actual wall lines to allow for construction clearance. This offset creates working space between the profile and the actual construction. For complex masonry projects, standard offsets (typically 1-2 meters) ensure profiles remain undisturbed during construction while still providing clear sight lines for string positioning. The offset distance must be consistent and clearly recorded to maintain accuracy when transferring measurements from profiles to actual building positions."
  },
  {
    id: 'bricklaying-l3-topic5-33',
    question: "When setting out for a non-rectangular building, why is establishing accurate corner angles critical?",
    options: ["It only affects the building's appearance", "Corner angles determine the relationship between adjacent walls and the overall geometry of the structure", "It's only important for billing purposes", "Corner angles don't matter as long as walls are straight"],
    correctAnswer: "Corner angles determine the relationship between adjacent walls and the overall geometry of the structure",
    explanation: "When setting out non-rectangular buildings, establishing accurate corner angles is critical because they determine the relationship between adjacent walls and the overall geometry of the structure. Errors in corner angles compound as construction progresses, potentially causing walls to misalign at junctions or preventing the building from closing properly. For complex masonry structures with multiple non-standard angles, precise angle setting using appropriate equipment like theodolites or total stations ensures the integrity of the intended design geometry."
  },
  {
    id: 'bricklaying-l3-topic5-34',
    question: "What is the primary purpose of a 'site survey' before setting out complex masonry?",
    options: ["To find the best location for site offices", "To identify existing conditions, levels, and features that may affect the setting out", "To determine soil composition only", "To estimate project duration"],
    correctAnswer: "To identify existing conditions, levels, and features that may affect the setting out",
    explanation: "A site survey identifies existing conditions, levels, and features that may affect setting out. This preliminary process documents the site's current state, identifying boundaries, levels, existing structures, underground services, and potential obstructions. For complex masonry projects, comprehensive survey information ensures setting out accounts for site realities. Modern surveys often use digital techniques to create detailed 3D models, providing precise reference data for the setting out process and identifying potential conflicts before work begins."
  },
  {
    id: 'bricklaying-l3-topic5-35',
    question: "What is a 'control network' in the context of setting out large or complex projects?",
    options: ["A computer network controlling construction equipment", "A series of interconnected reference points established across the site", "A network of supervisors controlling the project", "A system for controlling material deliveries"],
    correctAnswer: "A series of interconnected reference points established across the site",
    explanation: "A control network is a series of interconnected reference points established across the site. For large or complex masonry projects, this network provides a consistent reference system for all setting out activities. The points are precisely surveyed and documented, often using total stations and GPS equipment to ensure high accuracy. Construction teams can then set out any portion of the project from these known points, maintaining geometrical accuracy and consistency across extended areas or between different phases of construction."
  },
  {
    id: 'bricklaying-l3-topic5-36',
    question: "What does 'reducing a survey' mean in the context of setting out?",
    options: ["Making a survey smaller in scale", "Simplifying a complex survey", "Converting field measurements to usable coordinates and levels", "Reducing the number of survey points"],
    correctAnswer: "Converting field measurements to usable coordinates and levels",
    explanation: "Reducing a survey means converting field measurements to usable coordinates and levels. This process transforms raw survey data into practical information for setting out. For complex masonry projects, reduction involves mathematical calculations to convert angle and distance measurements into coordinates and elevations referenced to established datums. Modern survey equipment often performs this reduction automatically, but understanding the process helps identify any inconsistencies before they affect the setting out."
  },
  {
    id: 'bricklaying-l3-topic5-37',
    question: "What is the purpose of 'ranging rods' in traditional setting out?",
    options: ["Measuring the range of different bricks available", "Brightly colored poles used to establish straight lines over distance by sight", "Rods used to mix mortar", "Tools for cleaning ranging areas"],
    correctAnswer: "Brightly colored poles used to establish straight lines over distance by sight",
    explanation: "Ranging rods are brightly colored poles used to establish straight lines over distance by sight. These distinctive red and white striped rods provide highly visible reference points when setting out straight lines across longer distances. For complex masonry projects, multiple ranging rods can be aligned by eye to establish wall runs, boundary lines, or grid references. This traditional technique remains useful for initial setting out, especially in situations where electronic equipment might be impractical."
  },
  {
    id: 'bricklaying-l3-topic5-38',
    question: "What is a 'batter rule' used for in masonry setting out?",
    options: ["Mixing mortar to the right consistency", "A rule stating when to stop work in bad weather", "A device for setting out sloping faces of walls or structures", "A rule about the pattern of bricks to be used"],
    correctAnswer: "A device for setting out sloping faces of walls or structures",
    explanation: "A batter rule is a device for setting out sloping faces of walls or structures. It consists of an adjustable frame that establishes the intended angle of incline from vertical. For complex masonry with deliberately sloping faces (like retaining walls), the batter rule provides a consistent reference for maintaining the correct angle throughout construction. The rule can be set to the designed angle and used with plumb bobs or levels to guide the placement of each course."
  },
  {
    id: 'bricklaying-l3-topic5-39',
    question: "In setting out complex masonry, what is the purpose of 'line and pins'?",
    options: ["A game played during breaks", "A traditional method using pins driven into mortar joints with a line stretched between them", "A method for fastening safety barriers", "A technique for marking brick positions"],
    correctAnswer: "A traditional method using pins driven into mortar joints with a line stretched between them",
    explanation: "Line and pins is a traditional method using pins driven into mortar joints with a line stretched between them. This technique provides guidance for ongoing brickwork by establishing a taut string line at the exact height of the next course. For complex masonry, line pins offer a flexible system that can be quickly adjusted as work progresses. The pins are typically positioned at corners or key points, with the line providing both height and alignment reference for each course."
  },
  {
    id: 'bricklaying-l3-topic5-40',
    question: "What is a 'dumpy level' used for in setting out?",
    options: ["Checking that excavations are at the correct depth", "An informal level check", "A precision optical instrument for transferring heights and levels across site", "Establishing wall heights only"],
    correctAnswer: "A precision optical instrument for transferring heights and levels across site",
    explanation: "A dumpy level is a precision optical instrument for transferring heights and levels across site. It provides a fixed horizontal line of sight, allowing accurate level measurements between points regardless of distance. For complex masonry projects, dumpy levels establish consistent heights for features, floors, and course levels across the entire construction. Though increasingly replaced by laser levels, traditional dumpy levels remain reliable tools for accurate level setting out, unaffected by lighting conditions or power requirements."
  },
  {
    id: 'bricklaying-l3-topic5-41',
    question: "What does 'reduced level' refer to in setting out?",
    options: ["A level that has been lowered for accessibility", "A height measurement expressed relative to a site datum or Ordnance Datum", "A secondary level of less importance", "A level that has been reduced in scope"],
    correctAnswer: "A height measurement expressed relative to a site datum or Ordnance Datum",
    explanation: "Reduced level refers to a height measurement expressed relative to a site datum or Ordnance Datum. These standardized height references allow consistent vertical positioning across the project. For complex masonry with multiple level changes, reduced levels ensure all heights relate correctly to each other and to the overall design. Typically noted as 'RL' on drawings, these measurements provide absolute height information rather than relative dimensions, crucial for accurate setting out of level-critical features."
  },
  {
    id: 'bricklaying-l3-topic5-42',
    question: "What is 'laser scanning' in modern setting out techniques?",
    options: ["Using lasers to cut bricks to size", "A technology that captures detailed 3D measurements of existing conditions", "A method for checking brick quality", "A technique for drying mortar quickly"],
    correctAnswer: "A technology that captures detailed 3D measurements of existing conditions",
    explanation: "Laser scanning is a technology that captures detailed 3D measurements of existing conditions. The scanner emits laser beams that reflect off surfaces, creating millions of measured points (a 'point cloud'). For complex masonry projects, particularly renovations or additions to existing structures, laser scanning provides extremely accurate documentation of current conditions. This digital data enables precise setting out that accounts for irregularities in existing structures, ensuring new masonry interfaces correctly with established elements."
  },
  {
    id: 'bricklaying-l3-topic5-43',
    question: "What is 'interpolation' in setting out levels?",
    options: ["Interpreting level data from different sources", "The process of establishing an intermediate level between two known levels", "Changing levels during construction", "Converting between metric and imperial measurements"],
    correctAnswer: "The process of establishing an intermediate level between two known levels",
    explanation: "Interpolation is the process of establishing an intermediate level between two known levels. For masonry with sloping elements or gradual level changes, interpolation determines precise heights at any point along the slope. By calculating proportionally between known points, setting out can establish exact levels at regular intervals or at critical positions. This technique enables accurate implementation of designed slopes, ensuring proper drainage, aesthetic intent, and structural performance in complex masonry features."
  },
  {
    id: 'bricklaying-l3-topic5-44',
    question: "What is 'digital setting out' in modern construction?",
    options: ["Using fingers to measure distances", "Setting out that only happens during daylight hours", "Using electronic instruments and software to establish position data", "Setting out computer equipment on site"],
    correctAnswer: "Using electronic instruments and software to establish position data",
    explanation: "Digital setting out uses electronic instruments and software to establish position data. This modern approach employs total stations, GPS, laser scanners, and specialized software to translate design information directly to the construction site. For complex masonry projects, digital techniques offer higher precision, better integration with design models, and streamlined workflows. Digital setting out can transfer complex geometries from BIM models to physical space, particularly valuable for masonry with irregular shapes, curves, or precise positioning requirements."
  },
  {
    id: 'bricklaying-l3-topic5-45',
    question: "What is the purpose of 'as-built surveys' in relation to setting out?",
    options: ["Surveys done exactly as specified", "Measurements taken during construction", "Detailed documentation of the actual constructed position of elements, which may differ slightly from setting out", "Surveys of buildings as they were originally built historically"],
    correctAnswer: "Detailed documentation of the actual constructed position of elements, which may differ slightly from setting out",
    explanation: "As-built surveys provide detailed documentation of actual constructed positions, which may differ slightly from setting out. These surveys record the reality of what was built rather than what was planned. For complex masonry projects, as-built information is valuable for future reference, additions, or renovations. By comparing as-built surveys with original setting out, teams can identify dimensional variations that occurred during construction, providing critical information for adjoining works or future modifications."
  },
  {
    id: 'bricklaying-l3-topic5-46',
    question: "When setting out a spiral staircase in masonry, what is particularly important to establish accurately?",
    options: ["The color of the bricks to be used", "The central axis around which the spiral revolves", "The type of mortar only", "The timing of construction"],
    correctAnswer: "The central axis around which the spiral revolves",
    explanation: "When setting out a spiral staircase in masonry, establishing the central axis around which the spiral revolves is particularly important. This vertical reference line determines the geometry of the entire stair. For complex masonry spirals, all measurements derive from this axis, with each step positioned at the correct radius and rotation angle. Accurate establishment of this axis ensures the stair maintains consistent rise, going, and headroom throughout the spiral, while achieving the intended overall height and rotation."
  },
  {
    id: 'bricklaying-l3-topic5-47',
    question: "What is a 'snap line' or 'chalk line' used for in setting out?",
    options: ["Breaking bricks along a straight line", "Creating a straight line mark by snapping a chalk-coated string against a surface", "Measuring the straightness of existing walls", "Checking if bricks will break under pressure"],
    correctAnswer: "Creating a straight line mark by snapping a chalk-coated string against a surface",
    explanation: "A snap line or chalk line creates a straight line mark by snapping a chalk-coated string against a surface. The tool consists of a retractable string coated with chalk powder. For masonry setting out, it quickly establishes straight reference lines on floors, foundations, or other surfaces. This technique is particularly useful for marking long straight lines where a taut string might otherwise be difficult to see. The resulting chalk mark provides a clear, temporary guide for positioning masonry elements."
  },
  {
    id: 'bricklaying-l3-topic5-48',
    question: "What is the primary consideration when setting out a freestanding curved masonry wall?",
    options: ["The color pattern of bricks", "Ensuring structural stability through proper radius and height relationship", "Making it as tall as possible", "Using as few bricks as possible"],
    correctAnswer: "Ensuring structural stability through proper radius and height relationship",
    explanation: "When setting out a freestanding curved masonry wall, ensuring structural stability through proper radius and height relationship is the primary consideration. Curved walls derive stability from their geometry, with minimum radius requirements increasing with wall height. For complex curved masonry, accurate setting out of the radius is critical to structural integrity. The setting out must establish both the correct curvature and appropriate thickness, typically greater than for straight walls of similar height, to ensure the completed structure has adequate stability."
  },
  {
    id: 'bricklaying-l3-topic5-49',
    question: "What is the role of 'position risk assessment' in setting out complex masonry?",
    options: ["Assessing health and safety risks of working positions", "Evaluating the consequences of positional errors for different elements", "Determining the risk of bad weather affecting the position", "Assessing the risk of materials not being in position when needed"],
    correctAnswer: "Evaluating the consequences of positional errors for different elements",
    explanation: "Position risk assessment evaluates the consequences of positional errors for different elements. This analytical process identifies which dimensions and positions are most critical to project success. For complex masonry, some elements may have tight tolerances while others allow more flexibility. Understanding these varying requirements helps prioritize setting out efforts, with more precise techniques and verification applied to high-risk positions where errors would have significant structural, functional, or aesthetic consequences."
  },
  {
    id: 'bricklaying-l3-topic5-50',
    question: "What is 'reflectorless EDM' technology in modern setting out?",
    options: ["Electronic music played on reflective surfaces", "Distance measurement that doesn't require a mirror", "Electronic distance measurement that can measure distances without requiring a prism reflector at the target point", "A method of applying reflective coatings to bricks"],
    correctAnswer: "Electronic distance measurement that can measure distances without requiring a prism reflector at the target point",
    explanation: "Reflectorless EDM is electronic distance measurement technology that can measure distances without requiring a prism reflector at the target point. Modern total stations with this capability can directly measure to surfaces by analyzing the reflected laser beam. For complex masonry setting out, this allows measurement to inaccessible points or existing structures without placing reflectors. The technology simplifies the documentation of existing conditions and setting out relative to established features, particularly valuable for renovation work or complex interfaces with existing masonry."
  }
];

// ✅ Upload function
async function uploadQuestions() {
    for (const q of questions) {
      try {
        await setDoc(doc(db, 'questions', 'bricklaying-l3-setting-out', 'items', q.id), {
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
        });
        console.log(`✅ Uploaded: ${q.id}`);
      } catch (err) {
        console.error(`❌ Error uploading ${q.id}:`, err);
      }
    }
  }
  
  uploadQuestions();
  