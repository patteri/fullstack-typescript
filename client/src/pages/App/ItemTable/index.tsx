import React from 'react';
import { Item } from 'common';
import './index.css';

interface Props {
  isLoading: boolean;
  items: Item[];
  removeItem(item: Item): void;
}

const ItemTable: React.FC<Props> = ({ isLoading, items, removeItem }) => (
  <table className="table item-table">
    <thead>
      <tr>
        <th style={{ width: '45%' }}>Name</th>
        <th style={{ width: '45%' }}>Value</th>
        <th style={{ width: '10%' }} />
      </tr>
    </thead>
    <tbody>
      <>
        {items.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.value}</td>
            <td>
              <button className="btn btn-link" onClick={() => removeItem(item)}>
                <i className="fas fa-times" />
              </button>
            </td>
          </tr>
        ))}
        {!isLoading && items.length === 0 && (
          <tr>
            <td colSpan={3}>
              <span>No items</span>
            </td>
          </tr>
        )}
        {isLoading && (
          <tr>
            <td colSpan={3}>
              <div className="spinner-border" />
            </td>
          </tr>
        )}
      </>
    </tbody>
  </table>
);

export default ItemTable;
