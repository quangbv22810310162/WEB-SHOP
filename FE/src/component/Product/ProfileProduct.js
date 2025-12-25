import React from 'react';

function ProfileProduct(props) {
    let data = props.data
    return (
        <div className="table-responsive">
            <table className="table">
                <tbody>
                    <tr>
                        <td>
                            <h5>Chiều rộng</h5>
                        </td>
                        <td>
                            <h5>{data.width}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h5>Chiều cao</h5>
                        </td>
                        <td>
                            <h5>{data.height}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h5>Cân nặng</h5>
                        </td>
                        <td>
                            <h5>{data.weight}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h5>Kiểm tra chất lượng sản phẩm</h5>
                        </td>
                        <td>
                            <h5>Có</h5>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ProfileProduct;