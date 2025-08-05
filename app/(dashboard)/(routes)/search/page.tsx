import React from "react";
import { SearchInput } from "./_components/search-input";
import Categories from "./_components/categories";
import CoureseCard from "./_components/course-card";


const page = async () => {
  const response = await fetch(`http://localhost:3000/api/categories`, {
    method: "GET",
  });
  const result = await fetch(`http://localhost:3000/api/courses`,{
    method:"GET"
  })
 const courses = await result.json()

  // const courses = [
  //   {
  //     creator: "60d5ec49f1a2c8b1f8c8e1a1", // Example ObjectId for User
  //     userId: "user123",
  //     title: "Introduction to Programming",
  //     description: "Learn the basics of programming using Python.",
  //     imageUrl: "https://example.com/images/python-course.jpg",
  //     price: 49.99,
  //     isPublished: true,
  //     categoryId: "60d5ec49f1a2c8b1f8c8e1b2", // Example ObjectId for Category
  //     attachments: [],
  //     chapters: [],
  //     createdAt: new Date(),
  //   },
  //   {
  //     creator: "60d5ec49f1a2c8b1f8c8e1a2", // Example ObjectId for User
  //     userId: "user456",
  //     title: "Web Development Bootcamp",
  //     description: "Become a full-stack web developer in just a few weeks.",
  //     imageUrl: "https://example.com/images/web-dev-bootcamp.jpg",
  //     price: 199.99,
  //     isPublished: true,
  //     categoryId: "60d5ec49f1a2c8b1f8c8e1b3", // Example ObjectId for Category
  //     attachments: [
      
  //     ],
  //     chapters: [
      
  //     ],
  //     createdAt: new Date(),
  //   },
  //   {
  //     creator: "60d5ec49f1a2c8b1f8c8e1a3", // Example ObjectId for User
  //     userId: "user789",
  //     title: "Data Science with R",
  //     description:
  //       "An in-depth course on data analysis and visualization using R.",
  //     imageUrl: "https://example.com/images/data-science-r.jpg",
  //     price: 99.99,
  //     isPublished: false,
  //     categoryId: "60d5ec49f1a2c8b1f8c8e1b4", // Example ObjectId for Category
  //     attachments: [],
  //     chapters: [
      
  //     ],
  //     createdAt: new Date(),
  //   },
  // ];

  const categories = await response.json();
  return (
    <>
      <div className="px-6 pt-6 md:hidden mb:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-4">
        <Categories items={categories.categoryList} />
      </div>
      <div>
        <div className="grid md:grid-cols-2 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 p-4">
          {courses.courseList.map((course:any) => (
            <CoureseCard 
            key={course.title}
            course={course}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
