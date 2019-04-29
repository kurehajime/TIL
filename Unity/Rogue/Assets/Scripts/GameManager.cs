using UnityEngine;
using System.Collections;

using System.Collections.Generic;       //Allows us to use Lists. 

public class GameManager : MonoBehaviour
{

    public static GameManager instance = null;              //Static instance of GameManager which allows it to be accessed by any other script.
    private BoardManager boardScript;                       //Store a reference to our BoardManager which will set up the level.
    private int level = 3;                                  //Current level number, expressed in game as "Day 1".

    //Awakeを定義して置くと起動時に呼び出される。overrideしなくて良いのはUnityの魔法
    void Awake()
    {
        //シングルトン
        if (instance == null)
        {
            instance = this;
        }
        else if (instance != this)
        {
            Destroy(gameObject);
        }
        //Unityではシーンを切り替えるとgameObjectが全部破棄されるが、これをやってると保持できる
        DontDestroyOnLoad(gameObject);

        //ボードスクリプトをセット
        boardScript = GetComponent<BoardManager>();

        //ゲームを初期化
        InitGame();
    }

    //Initializes the game for each level.
    void InitGame()
    {
        //ボードスクリプトを呼び出す。
        boardScript.SetupScene(level);

    }



    //Update is called every frame.
    void Update()
    {

    }
}
