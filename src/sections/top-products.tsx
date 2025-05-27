import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BASE_URL } from "@/lib/api";

interface Course {
  _id: string;
  slug: string;
  title: string;
  featured_image: string;
  featured_video: string;
  duration: number;
  level: string;
  category: string;
  subcategory: string;
  base_price: number;
  discount_percentage: number;
}

interface TopProductsProps {
  searchTerm: string;
}

const extractYouTubeId = (url: string): string => {
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : "";
};

const TopProducts: React.FC<TopProductsProps> = ({ searchTerm }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const query = searchTerm?.trim()
          ? `${BASE_URL}/courses?search=${encodeURIComponent(searchTerm)}`
          : `${BASE_URL}/courses`;

        const res = await fetch(query);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setCourses(Array.isArray(data.courses) ? data.courses : []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [searchTerm]);

  const getDiscountedPrice = (base_price: number, discount: number) =>
    Math.round(base_price - (base_price * discount) / 100);

  return (
    <section className="p-6 lg:px-24 mt-0">
      <h1 className="main-heading mb-6">
        {searchTerm?.trim() ? "Search Results" : "All Swayam Courses"}
      </h1>

      {loading ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <p>Loading courses...</p>
        </div>
      ) : courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => {
            const videoId = extractYouTubeId(course.featured_video);
            return (
              <Link
                key={course._id}
                href={`/${course.slug}`}
                className="block bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition cursor-pointer flex flex-col"
                style={{ height: "100%" }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 flex-shrink-0 group">
                  {hoveredIndex === index && videoId ? (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title={course?.title}
                    />
                  ) : videoId ? (
                    <Image
                      src={course?.featured_image || "/bannerimage.png"}
                      alt={course?.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    // <video
                    //   className="absolute inset-0 w-full h-full object-cover"
                    //   autoPlay
                    //   loop
                    //   muted
                    //   playsInline
                    // >
                    //   <source src="/teaservideo.mp4" type="video/mp4" />
                    //   Your browser does not support the video tag.
                    // </video>
                    <Image
                      src={"/bannerimage.png"}
                      alt={course?.title}
                      layout="fill"
                      objectFit="cover"   
                    />
                  )}
                </div>

                <h2 className="text-lg font-semibold mb-1 flex-shrink-0">
                  {course.title}
                </h2>

                <div className="text-sm text-gray-600 mb-2 flex-grow">
                  <p>Duration: {course.duration} mins</p>
                  <p>Level: {course.level}</p>
                  <p>
                    Category: {course.category} / {course.subcategory}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2 flex-shrink-0">
                  <div>
                    <span className="text-xl font-bold text-green-600">
                      ₹
                      {getDiscountedPrice(
                        course.base_price,
                        course.discount_percentage
                      )}
                    </span>
                    {course.discount_percentage > 0 && (
                      <span className="text-sm line-through text-gray-400 ml-2">
                        ₹{course.base_price}
                      </span>
                    )}
                  </div>
                  {course.discount_percentage > 0 && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                      {course.discount_percentage}% OFF
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default TopProducts;
