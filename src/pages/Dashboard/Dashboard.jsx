
const Dashboard = () => {
  return (
    <div>
      <div class="flex  mb-5">
        <aside class="w-1/4 bg-blue-900 text-white flex flex-col p-4">
          <div class="flex flex-col items-center mb-8">
            <img
              src="https://via.placeholder.com/80"
              alt="Profile"
              class="rounded-full mb-4"
            />
            <h2 class="text-lg font-semibold">Andrew Bennet</h2>
          </div>
          <ul class="space-y-4">
            <li class="bg-blue-700 p-2 rounded">Dashboard</li>
            <li class="hover:bg-blue-700 p-2 rounded">Calendar</li>
            <li class="hover:bg-blue-700 p-2 rounded flex justify-between items-center">
              Inbox <span class="bg-red-500 text-white rounded-full px-2">7</span>
            </li>
            <li class="hover:bg-blue-700 p-2 rounded">Widget</li>
            <li class="hover:bg-blue-700 p-2 rounded flex justify-between items-center">
              Tasks <span class="bg-green-500 text-white rounded-full px-2">4</span>
            </li>
            <li class="hover:bg-blue-700 p-2 rounded">Profile</li>
            <li class="hover:bg-blue-700 p-2 rounded">Write Post</li>
            <li class="hover:bg-blue-700 p-2 rounded">Pages</li>
            <li class="hover:bg-blue-700 p-2 rounded">Chart</li>
            <li class="hover:bg-blue-700 p-2 rounded">Social App</li>
            <li class="hover:bg-blue-700 p-2 rounded">Global Setting</li>
          </ul>
        </aside>

        <main class="flex-1 bg-gray-100 p-6">
          <header class="flex justify-between items-center mb-8">
            <h1 class="text-2xl font-semibold">Dashboard</h1>
            <input
              type="text"
              placeholder="Search"
              class="border border-gray-300 rounded p-2 w-1/3"
            />
          </header>

          <section class="grid grid-cols-3 gap-6 mb-8">
            <div class="bg-white p-4 rounded shadow">
              <h2 class="text-lg font-semibold mb-4">This Week Income</h2>
              <p class="text-2xl font-bold text-green-500">$1250</p>
              <ul class="mt-4 text-sm">
                <li>Item #1 sold: 50</li>
                <li>Item #2 sold: 10</li>
                <li>Item #3 sold: 5</li>
                <li>Total items sold: 72</li>
              </ul>
            </div>
            <div class="bg-white p-4 rounded shadow">
              <h2 class="text-lg font-semibold mb-4">Sales</h2>
              <div class="h-32 bg-gray-200 flex items-center justify-center rounded">
                [Chart Placeholder]
              </div>
            </div>
            <div class="bg-white p-4 rounded shadow">
              <h2 class="text-lg font-semibold mb-4">July 2018</h2>
              <div class="h-32 bg-gray-200 flex items-center justify-center rounded">
                [Calendar Placeholder]
              </div>
            </div>
          </section>

          {/* <!-- Details Section --> */}
          <section class="grid grid-cols-2 gap-6">
            {/* <!-- Recent Orders --> */}
            <div class="bg-white p-4 rounded shadow">
              <h2 class="text-lg font-semibold mb-4">Recent Orders</h2>
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b">
                    <th class="text-left p-2">Client</th>
                    <th class="text-left p-2">Order #</th>
                    <th class="text-left p-2">Date</th>
                    <th class="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="p-2">Mr. Daniels</td>
                    <td class="p-2">#129078</td>
                    <td class="p-2">11-07-18</td>
                    <td class="p-2 text-green-500">Completed</td>
                  </tr>
                  <tr>
                    <td class="p-2">Mr. Tommy</td>
                    <td class="p-2">#129079</td>
                    <td class="p-2">11-07-18</td>
                    <td class="p-2 text-green-500">Completed</td>
                  </tr>
                  <tr>
                    <td class="p-2">Mr. Vangal</td>
                    <td class="p-2">#129080</td>
                    <td class="p-2">11-07-18</td>
                    <td class="p-2 text-yellow-500">Inactive</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* <!-- Recent Comments --> */}
            <div class="bg-white p-4 rounded shadow">
              <h2 class="text-lg font-semibold mb-4">Recent Comments</h2>
              <div class="mb-4">
                <p class="text-sm"><strong>Mark J Hamilton</strong>: Lorem ipsum dolor sit amet...</p>
                <button class="text-blue-500 text-sm">Reply</button>
              </div>
              <div>
                <p class="text-sm"><strong>Thomas Gold</strong>: Duis autem vel eum irure...</p>
                <button class="text-blue-500 text-sm">Reply</button>
              </div>
            </div>
          </section>

          {/* <!-- Contacts Section --> */}
          <section class="bg-white p-4 rounded shadow mt-8">
            <h2 class="text-lg font-semibold mb-4">Contacts</h2>
            <ul class="grid grid-cols-2 gap-4">
              <li class="flex items-center">
                <div class="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center mr-4"></div>
                <div>
                  <p class="text-sm font-semibold">Name of Contact</p>
                  <p class="text-sm">name@email.com</p>
                  <p class="text-sm">+123 456 7890</p>
                </div>
              </li>
              <li class="flex items-center">
                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4"></div>
                <div>
                  <p class="text-sm font-semibold">Name of Contact</p>
                  <p class="text-sm">name@email.com</p>
                  <p class="text-sm">+123 456 7890</p>
                </div>
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
