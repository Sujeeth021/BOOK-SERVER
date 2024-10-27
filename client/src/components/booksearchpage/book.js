import React from "react";
import defaultBook from "./img/defaultBook.png";
import "./sass/style.css";
import { motion } from "framer-motion";

const Book = ({ title, author, cover }) => {
  const imageVariants = {
    hover: {
      scale: 1.7,
      boxShadow: "0px 0px 8px #000",
      transition: {
        duration: 0.5,
        type: "spring",
        delay: 0.15,
      },
    },
  };

  // Setting up default values for book info
  title = title || "Title is not available";
  author = author || "Author(s) name not available";
  const coverImage = cover || defaultBook;

  return (
    <section className="loading-card">
      <div>
        <div>
          <motion.img
            src={coverImage}
            width="100px"
            alt="Book-cover"
            variants={imageVariants}
            whileHover="hover"
          />
        </div>
        <div>
          {title && (
            <div>
              <h3 className="inline">{title}</h3>
            </div>
          )}
        </div>

        <div>
          {author && (
            <h4 style={{ paddingBottom: "1rem", color: "black" }}>
              Author:{" "}
              <span style={{ fontWeight: "bold", color: "#3B3B3B" }}>
                {author}
              </span>
            </h4>
          )}
        </div>

        {/* Add more details if needed */}
      </div>
    </section>
  );
};

export default Book;
