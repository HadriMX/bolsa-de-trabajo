<?php

require_once 'db_conn.php';

class MySessionHandler implements SessionHandlerInterface
{
    private $link;

    public function open($savePath, $sessionName)
    {
        $db = new Db();
        $this->link = $db->getConn();

        if (is_a($this->link, 'ErrorResult')) {
            return false;
        }
        else {
            return true;
        }
    }

    public function close()
    {
        mysqli_close($this->link);
        return true;
    }

    public function read($id)
    {
        $result = mysqli_query($this->link, "SELECT Session_Data FROM Session WHERE Session_Id = '" . $id . "' AND Session_Expires > '" . date('Y-m-d H:i:s') . "'");
        if ($row = mysqli_fetch_assoc($result)) {
            return $row['Session_Data'];
        } else {
            return "";
        }
    }

    public function write($id, $data)
    {
        $DateTime = date('Y-m-d H:i:s');
        $NewDateTime = date('Y-m-d H:i:s', strtotime($DateTime . ' + 24 hour'));
        $result = mysqli_query($this->link, "REPLACE INTO Session SET Session_Id = '" . $id . "', Session_Expires = '" . $NewDateTime . "', Session_Data = '" . $data . "'");
        return $result;
    }

    public function destroy($id)
    {
        $result = mysqli_query($this->link, "DELETE FROM Session WHERE Session_Id ='" . $id . "'");
        return $result;
    }

    public function gc($maxlifetime)
    {
        $result = mysqli_query($this->link, "DELETE FROM Session WHERE ((UNIX_TIMESTAMP(Session_Expires) + " . $maxlifetime . ") < " . $maxlifetime . ")");
        return $result;
    }
}

$handler = new MySessionHandler();
session_set_save_handler($handler, true);
