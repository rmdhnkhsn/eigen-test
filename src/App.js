import React from "react";
import axios from "axios";
import './index.css';

class App extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    errors: null
  };

  getArticles() {
    axios
      .get("https://newsapi.org/v2/everything?q=ai&apiKey=5f1cb51705b04ebfb27f12dd322cafcc")
      .then(response => {
        return response.data.articles.map(article => ({
          author: `${article.author}`,
          title: `${article.title}`,
          content: `${article.content}`,
          description: `${article.description}`
        }));
      })
      .then(articles => {
        this.setState({
          articles,
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getArticles();
  }

  render() {
    const { isLoading, articles } = this.state;
    console.log(articles);
    return (
      <React.Fragment>
        <div className="title">Article List</div>
        <div className="border"></div>
        <div className="container">
          {!isLoading ? (
            articles.map(article => {
              const { author, title, content, description } = article;
              return (
                <div className="content">
                  <div className="cards">
                    <div className="sub-title">Author</div>
                    <div className="desc">{author}</div>
                    <div className="sub-title">Title</div>
                    <div className="desc truncate1">{title}</div>
                    <div className="sub-title">Content</div>
                    <div className="desc truncate2">{content}</div>
                    <div className="sub-title">Description</div>
                    <div className="desc truncate2">{description}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </React.Fragment>
    );
  }
}
export default App;
