import React, {Component} from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  handleInputValueChange = (e) => {
    this.setState({value: e.target.value});
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleKeywordUpdate(this.state.value);
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            className='SearchtBar'
            placeholder='찾고 싶은 영상의 제목이나 단어를 입력하세요'
            onChange={this.handleInputValueChange}
          />
          <button type='submit' className='SearchtButton'>
            검색
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
