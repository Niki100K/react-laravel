<?php

namespace App\Http\Controllers;

use App\Models\OrderGameTableModel;
use App\Models\OrderTableModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UserOrdersController extends Controller
{
    public function order(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'price' => 'required',
            'items' => 'required',
            'data' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            DB::beginTransaction();

            $user = User::findOrFail($id);

            $order = OrderTableModel::create([
                'userId' => $id,
                'price' => $request->input('price'),
                'items' => $request->input('items'),
            ]);

            foreach ($request->input('data') as $item) {
                OrderGameTableModel::create([
                    'orderId' => $order->id,
                    'userId' => $user->id,
                    'gameId' => $item['id'],
                    'quantity' => $item['quantity'],
                    'name' => $item['name'],
                    'price' => $item['price'],
                ]);
            }

            DB::commit();

            return response()->json(['Order successfully has been set']);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
