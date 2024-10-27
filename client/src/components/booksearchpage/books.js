import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./img/Book.svg";
import Searchform from "./searchform";
import Book from "./book";
import LoadingCard from "./loadingCard";

const BookDetails = () => {
  const [details, setDetails] = useState([]);
  const [term, setTerm] = useState("Shakespeare");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://openlibrary.org/search.json?q=${term}&limit=11`
        );
        setDetails(response.data.docs);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [term]);

  const loadMore = async () => {
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${term}&limit=8&offset=${details.length}`
      );
      setDetails((oldDetails) => [...oldDetails, ...response.data.docs]);
    } catch (error) {
      console.error("Error loading more books:", error);
    }
  };

  return (
    <>
      <h2
        style={{
          textTransform: "capitalize",
          color: "#DB4437",
          fontSize: 40,
          marginTop: -40,
        }}
      >
        {term}
      </h2>
      <Searchform searchText={(text) => setTerm(text)} />
      {isLoading ? (
        <section className="container" style={{ padding: "2rem 0rem" }}>
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </section>
      ) : details.length === 0 ? (
        <h1
          className="loading-name"
          style={{
            background: "white",
            borderRadius: "1rem",
            color: "#DB4437",
            padding: "1rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            fontSize: 33,
            transform: "translate(-50%,-50%)",
            textTransform: "capitalize",
          }}
        >
          😞 Couldn't find books about {term}
        </h1>
      ) : (
        <section>
          <section className="container" style={{ padding: "2rem 0rem" }}>
            {details.map((book, index) => (
              <Book 
                key={index} 
                title={book.title} 
                author={book.author_name ? book.author_name.join(", ") : "Unknown"}
                cover={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null}
              />
            ))}
            <div className="custom-card">
              <h3 style={{ fontSize: "1.32rem", color: "white" }}>
                Didn't find the book you love?
              </h3>
              <br />
              <img
                style={{ width: "100%" }}
                src={logo}
                alt="A man reading a book"
              />
              <h3 style={{ fontSize: "1.21rem", color: "white" }}>
                Search for your favourite{" "}
                <span style={{ fontWeight: "bold", color: "black" }}>
                  Genre{" "}
                </span>
                or{" "}
                <span style={{ fontWeight: "bold", color: "black" }}>
                  Author{" "}
                </span>
                in the search box!!
              </h3>
            </div>
          </section>
          <div className="load-more">
            <button onClick={loadMore}>Load More!</button>
          </div>
        </section>
      )}
    </>
  );
};

export default BookDetails;
