<h2>Features:</h2>
<h3>Create a 7 tables</h3>

<p>user table</p>
<table>
  <tr>
    <th>id</th>
    <th>login</th>
    <th>firstName</th>
    <th>lastName</th>
    <th>counterAgents</th>
  </tr>
  <tr>
    <td>int</td>
    <td>string</td>
    <td>string</td>
    <td>string</td>
    <td>string</td>
    <td>counterAgent[] (type)</td>
  </tr>
</table>

<p>user table</p>
<table>
  <tr>
    <th>id</th>
    <th>name</th>
    <th>country</th>
    <th>INN</th>
    <th>KPP</th>
    <th>OGRN</th>
  </tr>
  <tr>
    <td>int</td>
    <td>string</td>
    <td>string</td>
    <td>Int</td>
    <td>Int</td>
    <td>Int</td>
  </tr>
</table>

<p>catalog table</p>
<table>
  <tr>
    <th>id</th>
    <th>name</th>
  </tr>
  <tr>
    <td>int</td>
    <td>string</td>
  </tr>  
</table>

<p>product table</p>
<table>
  <tr>
    <th>id</th>
    <th>login</th>
    <th>description</th>
    <th>priceOne</th>
    <th>priceMany</th>
  </tr>
  <tr>
    <td>int</td>
    <td>string</td>
    <td>string</td>
    <td>int</td>
    <td>int</td>
  </tr>
</table>

<p>orderStatus table</p>
<table>
  <tr>
    <th>id</th>
    <th>orderProducts</th>
    <th>subtotal</th>
    <th>counteragent</th>
    <th>admin</th>
  </tr>
  <tr>
    <td>int</td>
    <td>product[] (type)</td>
    <td>Int</td>
    <td>counterAgent (type)</td>
    <td>admin (type)</td>
  </tr>
</table>